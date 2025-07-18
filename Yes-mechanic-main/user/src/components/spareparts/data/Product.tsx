/* eslint-disable @typescript-eslint/no-explicit-any */
// import spareImg1 from '../../../assets/CarPart2.jfif'
// import diskrim from '../../../assets/CarPart1.jfif'  
import { getSparePartsData } from '../../../features/spareparts';
import { useState, useEffect } from 'react';
// import spareimg from '../../../assets/CarPart1.jfif'

interface SparePart {
    id: string;
    spareparts_name: string;
    price: number;
    stock: string;
    images: string[];
    type: string;
    image: string;
    category?: string;
    description: "High-quality wheel bearings and hubs for smooth and safe driving."
}


export const useSparePartsDataset = () => {
    const [parts, setParts] = useState<SparePart[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchSpareParts = async () => {
        try {
            setError(null);
            const response: any = await getSparePartsData({});
            if (response?.data?.data) {
                if (Array.isArray(response.data.data)) {
                    const validatedParts = response.data.data.map((part: any) => ({
                        id: part._id || '',
                        spareparts_name: part.productName || '',
                        price: Number(part.price) || 0,
                        stock: part.stock || '',
                        images: Array.isArray(part.images) ? part.images : [part.image || ''],
                        type: part.type || '',
                        image: part.image || (Array.isArray(part.images) ? part.images[0] : ''),
                        category: part.category || 'Uncategorized',
                    }));

                    setParts(validatedParts);

                } else {
                    throw new Error('API response data is not an array');
                }
            } else {
                throw new Error('Invalid API response structure');
            }
        } catch (error) {
            console.error('Error fetching spare parts:', error);
            setError(error instanceof Error ? error.message : 'Failed to fetch spare parts');
            setParts([]);
        }
    };

    useEffect(() => {
        fetchSpareParts();
    }, []);

    return { parts, error };

}

// Removed getCategoryData because useSparePartsDataset does not provide categoryData


// export const CategoryData = [
//   {
//     id: "wheels-and-tires",
//     title: "Wheels and Tires",
//     image: "https://img.freepik.com/free-vector/realistic-complete-set-car-wheels_1284-29765.jpg",
//     items: [
//       {
//         id: "bearings-hubs",
//         name: "Bearings & Hubs",
//         description: "High-quality wheel bearings and hubs for smooth and safe driving.",
//         price: "$89.99",
//         specs: ["Material: Steel", "Load Capacity: 1500kg", "Warranty: 2 years"],
//         image: spareImg1
//       },
//       {
//         id: "tire-set",
//         name: "All-Season Tires",
//         description: "Durable all-season tires for all road conditions.",
//         price: "$299.99",
//         specs: ["Size: 205/55R16", "Tread Life: 60,000 km", "Warranty: 3 years"],
//         image: spareImg1
//       },
//       {
//         id: "wheel-rims",
//         name: "Alloy Wheel Rims",
//         description: "Stylish alloy wheels for enhanced performance and looks.",
//         price: "$199.99",
//         specs: ["Material: Aluminum", "Size: 16 inch", "Finish: Glossy Black"],
//         image: diskrim
//       },
//       {
//         id: "bearings-hubs",
//         name: "Bearings & Hubs",
//         description: "High-quality wheel bearings and hubs for smooth and safe driving.",
//         price: "$89.99",
//         specs: ["Material: Steel", "Load Capacity: 1500kg", "Warranty: 2 years"],
//         image: spareImg1
//       },
//       {
//         id: "wheel-rims",
//         name: "Alloy Wheel Rims",
//         description: "Stylish alloy wheels for enhanced performance and looks.",
//         price: "$199.99",
//         specs: ["Material: Aluminum", "Size: 16 inch", "Finish: Glossy Black"],
//         image: diskrim
//       },
//     ]
//   },
//   {
//     id: "brakes-and-rotors",
//     title: "Brakes & Rotors",
//     image: "https://img.freepik.com/free-photo/car-disc-brake_1150-11599.jpg",
//     items: [
//       {
//         id: "ceramic-brake-pads",
//         name: "Ceramic Brake Pads",
//         description: "Low-dust, quiet braking with high-performance ceramic pads.",
//         price: "$59.99",
//         specs: ["Material: Ceramic", "Noise Reduction: Yes", "Warranty: 1 year"],
//         image: spareImg1
//       },
//       {
//         id: "brake-rotor",
//         name: "Vented Brake Rotor",
//         description: "High-performance vented rotors for better heat dissipation.",
//         price: "$75.00",
//         specs: ["Diameter: 300mm", "Material: Cast Iron", "Coating: Anti-Rust"],
//         image: diskrim
//       },
//       {
//         id: "brake-fluid",
//         name: "Brake Fluid DOT 4",
//         description: "Premium brake fluid with high boiling point.",
//         price: "$12.99",
//         specs: ["Type: DOT 4", "Volume: 1L", "Boiling Point: 250°C"],
//         image: spareImg1
//       }
//     ]
//   },
//   {
//     id: "engine-components",
//     title: "Engine Components",
//     image: "https://img.freepik.com/free-photo/engine-metal-parts-background_1172-243.jpg",
//     items: [
//       {
//         id: "spark-plug-set",
//         name: "Spark Plug Set",
//         description: "Improved ignition for better fuel efficiency and power.",
//         price: "$29.99",
//         specs: ["Type: Platinum", "Gap: 0.044\"", "Set: 4 pieces"],
//         image: diskrim
//       },
//       {
//         id: "timing-belt",
//         name: "Timing Belt Kit",
//         description: "Complete timing belt kit with tensioner and pulleys.",
//         price: "$89.99",
//         specs: ["Material: Rubber", "Fitment: Universal", "Warranty: 2 years"],
//         image: spareImg1
//       },
//       {
//         id: "oil-pump",
//         name: "Engine Oil Pump",
//         description: "Maintains oil flow and pressure inside engine.",
//         price: "$129.99",
//         specs: ["Type: Gear", "Material: Steel", "Fitment: OEM Replacement"],
//         image: spareImg1
//       }
//     ]
//   },
//   {
//     id: "suspension-and-steering",
//     title: "Suspension & Steering",
//     image: "https://img.freepik.com/free-photo/shock-absorber-car-part-isolated-white_93675-133017.jpg",
//     items: [
//       {
//         id: "shock-absorbers",
//         name: "Shock Absorbers",
//         description: "High-performance shocks for improved ride comfort.",
//         price: "$119.99",
//         specs: ["Fitment: Front", "Type: Gas Charged", "Warranty: 3 years"],
//         image: spareImg1
//       },
//       {
//         id: "control-arm",
//         name: "Control Arm Kit",
//         description: "Durable control arms for better steering control.",
//         price: "$95.00",
//         specs: ["Includes: Bushings & Ball Joint", "Fitment: Front Left/Right"],
//         image: diskrim
//       },
//       {
//         id: "tie-rod-end",
//         name: "Tie Rod Ends",
//         description: "Essential steering linkage part with long-lasting build.",
//         price: "$24.99",
//         specs: ["Material: Forged Steel", "Thread Size: M14", "Finish: Anti-corrosion"],
//         image: spareImg1
//       }
//     ]
//   },
//   {
//     id: "lighting-and-electrical",
//     title: "Lighting & Electrical",
//     image: "https://img.freepik.com/free-photo/car-led-headlight-isolated_1284-35021.jpg",
//     items: [
//       {
//         id: "led-headlights",
//         name: "LED Headlights",
//         description: "Ultra-bright LED headlights for maximum visibility.",
//         price: "$79.99",
//         specs: ["Lumens: 6000", "Color Temp: 6000K", "Lifespan: 30,000 hours"],
//         image: spareImg1
//       },
//       {
//         id: "tail-light-assembly",
//         name: "Tail Light Assembly",
//         description: "OEM replacement rear tail light with clear lenses.",
//         price: "$59.00",
//         specs: ["Compatibility: Sedan", "LED: Yes", "Plug & Play"],
//         image: spareImg1
//       },
//       {
//         id: "fog-light-kit",
//         name: "Fog Light Kit",
//         description: "Complete fog light set for enhanced road safety.",
//         price: "$49.99",
//         specs: ["Includes: Switch & Wiring", "Color: Yellow", "Waterproof: IP67"],
//         image:diskrim
//       }
//     ]
//   }
// ];
