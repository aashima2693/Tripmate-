import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: [true, 'Vendor name is required'],
        trim: true,
        index: true
    },
    vendorType: {
        type: String,
        enum: ['hotel', 'restaurant', 'transport', 'tour_operator', 'activity_provider', 'guide', 'other'],
        required: true
    },
    
    // Contact Information
    contactPerson: {
        name: String,
        designation: String,
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        }
    },
    
    // Business Details
    businessDetails: {
        gstNumber: String,
        panNumber: String,
        registrationNumber: String,
        licenseNumber: String,
        established: Date
    },
    
    // Location
    location: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true,
            index: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: String,
        country: {
            type: String,
            default: 'India'
        },
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    
    // Services Offered
    services: [{
        name: String,
        description: String,
        price: Number,
        unit: String, // per night, per person, per hour, etc.
        availability: {
            type: String,
            enum: ['available', 'limited', 'unavailable'],
            default: 'available'
        }
    }],
    
    // Media
    images: [String],
    videos: [String],
    
    // Ratings & Reviews
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: String,
        photos: [String],
        reviewedAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Verification
    isVerified: {
        type: Boolean,
        default: false
    },
    verifiedAt: Date,
    verificationDocuments: [String],
    
    // Partnership
    partnershipTier: {
        type: String,
        enum: ['basic', 'silver', 'gold', 'platinum'],
        default: 'basic'
    },
    commissionRate: {
        type: Number,
        default: 10, // percentage
        min: 0,
        max: 100
    },
    
    // Availability
    isActive: {
        type: Boolean,
        default: true
    },
    
    // Statistics
    stats: {
        totalBookings: {
            type: Number,
            default: 0
        },
        completedBookings: {
            type: Number,
            default: 0
        },
        cancelledBookings: {
            type: Number,
            default: 0
        },
        revenue: {
            type: Number,
            default: 0
        }
    },
    
    // Payment Details
    paymentDetails: {
        bankName: String,
        accountNumber: String,
        ifscCode: String,
        upiId: String,
        accountHolderName: String
    },
    
    // Amenities (for hotels)
    amenities: [{
        type: String,
        enum: ['wifi', 'parking', 'pool', 'gym', 'restaurant', 'bar', 'spa', 'room_service', 'laundry', 'airport_shuttle']
    }],
    
    // Operating Hours
    operatingHours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String }
    }

}, { 
    timestamps: true 
});

// Indexes
vendorSchema.index({ vendorType: 1, 'location.city': 1, isActive: 1 });
vendorSchema.index({ 'rating.average': -1 });

export const Vendor = mongoose.model('Vendor', vendorSchema);
