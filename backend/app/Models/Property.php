<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'price',
        'location',
        'city',
        'country',
        'type',
        'status',
        'bedrooms',
        'bathrooms',
        'area',
        'images',
    ];

    protected $casts = [
        'images' => 'array',
        'price'  => 'decimal:2',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
