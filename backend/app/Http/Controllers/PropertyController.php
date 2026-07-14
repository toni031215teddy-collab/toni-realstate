<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    // Public: list all available properties with optional filters
    public function index(Request $request)
    {
        $query = Property::with('owner:id,name')
            ->where('status', 'available');

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('city')) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('location', 'like', '%' . $request->search . '%')
                  ->orWhere('city', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->filled('bedrooms')) {
            $query->where('bedrooms', '>=', $request->bedrooms);
        }

        $properties = $query->latest()->paginate(12);

        return response()->json($properties);
    }

    // Public: show a single property
    public function show(Property $property)
    {
        $property->load('owner:id,name');
        return response()->json($property);
    }

    // Auth: create a property
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'location'    => 'required|string|max:255',
            'city'        => 'nullable|string|max:100',
            'country'     => 'nullable|string|max:100',
            'type'        => 'required|in:sale,rent',
            'bedrooms'    => 'required|integer|min:0',
            'bathrooms'   => 'required|integer|min:0',
            'area'        => 'required|integer|min:0',
            'images'      => 'nullable|array',
            'images.*'    => 'url',
        ]);

        $property = $request->user()->properties()->create($validated);

        return response()->json($property, 201);
    }

    // Auth: update own property
    public function update(Request $request, Property $property)
    {
        if ($request->user()->id !== $property->user_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $validated = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'sometimes|numeric|min:0',
            'location'    => 'sometimes|string|max:255',
            'city'        => 'nullable|string|max:100',
            'country'     => 'nullable|string|max:100',
            'type'        => 'sometimes|in:sale,rent',
            'status'      => 'sometimes|in:available,sold,rented',
            'bedrooms'    => 'sometimes|integer|min:0',
            'bathrooms'   => 'sometimes|integer|min:0',
            'area'        => 'sometimes|integer|min:0',
            'images'      => 'nullable|array',
        ]);

        $property->update($validated);

        return response()->json($property);
    }

    // Auth: delete own property
    public function destroy(Request $request, Property $property)
    {
        if ($request->user()->id !== $property->user_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $property->delete();

        return response()->json(['message' => 'Property deleted.']);
    }

    // Auth: list own properties
    public function myProperties(Request $request)
    {
        $properties = $request->user()->properties()->latest()->paginate(12);
        return response()->json($properties);
    }
}
