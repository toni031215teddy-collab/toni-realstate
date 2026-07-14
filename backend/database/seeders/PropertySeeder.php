<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        // Create a demo admin user
        $user = User::firstOrCreate(
            ['email' => 'demo@temerproperties.com'],
            [
                'name'     => 'Temer Properties',
                'password' => Hash::make('demo1234'),
            ]
        );

        $properties = [
            [
                'title'       => 'Luxury 3-Bedroom Apartment in Bole',
                'description' => 'A stunning modern apartment located in the heart of Bole, one of Addis Ababa\'s most sought-after neighborhoods. Features open-plan living, high-end finishes, 24/7 security, underground parking, and rooftop terrace with panoramic city views.',
                'price'       => 4500000,
                'location'    => 'Bole, near Edna Mall',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'sale',
                'status'      => 'available',
                'bedrooms'    => 3,
                'bathrooms'   => 2,
                'area'        => 150,
                'images'      => ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
            ],
            [
                'title'       => 'Modern Villa with Garden in Old Airport',
                'description' => 'Spacious family villa in the prestigious Old Airport area. Features 5 bedrooms, a large garden, modern kitchen, staff quarters, double garage, and a private swimming pool. Perfect for families seeking comfort and privacy.',
                'price'       => 12500000,
                'location'    => 'Old Airport, Addis Ababa',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'sale',
                'status'      => 'available',
                'bedrooms'    => 5,
                'bathrooms'   => 4,
                'area'        => 380,
                'images'      => ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
            ],
            [
                'title'       => '2-Bedroom Apartment for Rent in CMC',
                'description' => 'Well-maintained apartment in the quiet CMC neighborhood. Close to international schools, hospitals, and shopping centers. Fully furnished option available. Ideal for expats and professionals.',
                'price'       => 35000,
                'location'    => 'CMC, Addis Ababa',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'rent',
                'status'      => 'available',
                'bedrooms'    => 2,
                'bathrooms'   => 2,
                'area'        => 110,
                'images'      => ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
            ],
            [
                'title'       => 'Prime Office Space in Kazanchis',
                'description' => 'Modern office space in Kazanchis Business District, the commercial hub of Addis Ababa. Open-plan floor with high ceilings, fiber internet, backup generator, meeting rooms, and ground-floor parking. Ideal for corporate offices.',
                'price'       => 120000,
                'location'    => 'Kazanchis Business District',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'rent',
                'status'      => 'available',
                'bedrooms'    => 0,
                'bathrooms'   => 3,
                'area'        => 250,
                'images'      => ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
            ],
            [
                'title'       => 'Affordable Studio Apartment in Sarbet',
                'description' => 'Cozy and affordable studio apartment in Sarbet. Ideal for young professionals and students. Close to public transport, restaurants, and shopping. Building has 24/7 security and elevator.',
                'price'       => 18000,
                'location'    => 'Sarbet, near Ring Road',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'rent',
                'status'      => 'available',
                'bedrooms'    => 1,
                'bathrooms'   => 1,
                'area'        => 55,
                'images'      => ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
            ],
            [
                'title'       => '4-Bedroom Family Home in Ayat',
                'description' => 'Beautiful family home in the fast-growing Ayat area. Features 4 spacious bedrooms, modern kitchen, tiled floors, fenced compound, and a garden. Close to Ayat Shopping Mall and international schools.',
                'price'       => 6800000,
                'location'    => 'Ayat, Addis Ababa',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'sale',
                'status'      => 'available',
                'bedrooms'    => 4,
                'bathrooms'   => 3,
                'area'        => 220,
                'images'      => ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
            ],
            [
                'title'       => 'Commercial Shop Space in Merkato',
                'description' => 'Ground-floor commercial space in Merkato, Africa\'s largest open-air market. High foot traffic of over 30,000 daily visitors. Ideal for retail, showroom, or restaurant. Ready to move in.',
                'price'       => 85000,
                'location'    => 'Merkato, Addis Ababa',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'rent',
                'status'      => 'available',
                'bedrooms'    => 0,
                'bathrooms'   => 1,
                'area'        => 80,
                'images'      => ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'],
            ],
            [
                'title'       => 'Penthouse Apartment in Bole Medhanialem',
                'description' => 'Exclusive top-floor penthouse in Bole Medhanialem with 360-degree views of Addis Ababa. Features 4 bedrooms, 3 bathrooms, private terrace, smart home system, and VIP parking. The pinnacle of luxury living.',
                'price'       => 18000000,
                'location'    => 'Bole Medhanialem',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'sale',
                'status'      => 'available',
                'bedrooms'    => 4,
                'bathrooms'   => 3,
                'area'        => 280,
                'images'      => ['https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800'],
            ],
            [
                'title'       => '3-Bedroom Apartment in Lideta',
                'description' => 'Newly built apartment in Lideta with modern finishes. Close to St. Gabriel Hospital and Lideta Church. Features parking, 24/7 security, and backup power. Great value for the location.',
                'price'       => 3200000,
                'location'    => 'Lideta, Addis Ababa',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'sale',
                'status'      => 'available',
                'bedrooms'    => 3,
                'bathrooms'   => 2,
                'area'        => 130,
                'images'      => ['https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800'],
            ],
            [
                'title'       => 'G+2 Building for Sale in Megenagna',
                'description' => 'Fully built G+2 residential building near Megenagna roundabout. Currently generating rental income from 6 units. Excellent investment opportunity with high appreciation potential in this prime location.',
                'price'       => 22000000,
                'location'    => 'Megenagna, Addis Ababa',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'sale',
                'status'      => 'available',
                'bedrooms'    => 6,
                'bathrooms'   => 6,
                'area'        => 600,
                'images'      => ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800'],
            ],
            [
                'title'       => 'Furnished Apartment for Rent in Bole',
                'description' => 'Fully furnished 2-bedroom apartment in Bole, perfect for short or long-term stay. Includes all appliances, WiFi, weekly cleaning service, and underground parking. Available immediately.',
                'price'       => 55000,
                'location'    => 'Bole, near Friendship Hotel',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'rent',
                'status'      => 'available',
                'bedrooms'    => 2,
                'bathrooms'   => 2,
                'area'        => 100,
                'images'      => ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'],
            ],
            [
                'title'       => 'Land for Sale in Lebu',
                'description' => 'Prime residential land in the rapidly developing Lebu area on the outskirts of Addis Ababa. Accessible road, electricity and water available. Ideal for building your dream home or investment project.',
                'price'       => 2800000,
                'location'    => 'Lebu, Addis Ababa',
                'city'        => 'Addis Ababa',
                'country'     => 'Ethiopia',
                'type'        => 'sale',
                'status'      => 'available',
                'bedrooms'    => 0,
                'bathrooms'   => 0,
                'area'        => 300,
                'images'      => ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'],
            ],
        ];

        foreach ($properties as $data) {
            Property::create(array_merge($data, ['user_id' => $user->id]));
        }
    }
}
