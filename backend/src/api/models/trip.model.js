import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: [true, 'Trip title is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    
    // Trip Details
    destination: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            default: 'India'
        },
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    
    // Trip Timeline
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    duration: {
        days: {
            type: Number,
            required: true
        },
        nights: {
            type: Number,
            required: true
        }
    },
    
    // Budget
    budget: {
        estimated: {
            type: Number,
            required: true
        },
        actual: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: 'INR'
        }
    },
    
    // Trip Type
    tripType: {
        type: String,
        enum: ['solo', 'couple', 'family', 'group'],
        required: true
    },
    
    // AI-Generated Itinerary
    itinerary: [{
        day: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        activities: [{
            time: String,
            title: String,
            description: String,
            location: {
                name: String,
                address: String,
                coordinates: {
                    latitude: Number,
                    longitude: Number
                }
            },
            duration: String,
            cost: Number,
            category: {
                type: String,
                enum: ['sightseeing', 'food', 'transport', 'accommodation', 'activity', 'shopping', 'other']
            }
        }],
        meals: {
            breakfast: { venue: String, cost: Number },
            lunch: { venue: String, cost: Number },
            dinner: { venue: String, cost: Number }
        },
        accommodation: {
            name: String,
            address: String,
            checkIn: String,
            checkOut: String,
            cost: Number
        }
    }],
    
    // Companions
    companions: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['invited', 'accepted', 'declined', 'removed'],
            default: 'invited'
        },
        invitedAt: {
            type: Date,
            default: Date.now
        },
        respondedAt: Date
    }],
    
    // Bookings
    bookings: [{
        type: {
            type: String,
            enum: ['hotel', 'transport', 'activity', 'guide', 'other']
        },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
        },
        bookingReference: String,
        name: String,
        date: Date,
        amount: Number,
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending'
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'refunded', 'failed'],
            default: 'pending'
        }
    }],
    
    // Trip Status
    status: {
        type: String,
        enum: ['planning', 'booked', 'ongoing', 'completed', 'cancelled'],
        default: 'planning'
    },
    
    // AI Risk Score (for safety)
    riskScore: {
        overall: {
            type: Number,
            min: 0,
            max: 100,
            default: 50
        },
        factors: {
            weather: Number,
            political: Number,
            health: Number,
            crime: Number
        },
        lastUpdated: Date
    },
    
    // Reviews & Ratings (after trip completion)
    review: {
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        photos: [String],
        reviewedAt: Date
    },
    
    // Privacy
    isPublic: {
        type: Boolean,
        default: false
    },
    
    // Offline Access
    offlineData: {
        isDownloaded: {
            type: Boolean,
            default: false
        },
        lastSynced: Date
    }

}, { 
    timestamps: true 
});

// Indexes for query optimization
tripSchema.index({ userId: 1, status: 1 });
tripSchema.index({ startDate: 1, endDate: 1 });
tripSchema.index({ 'destination.city': 1, 'destination.state': 1 });

// Virtual for total companions
tripSchema.virtual('totalCompanions').get(function() {
    return this.companions.filter(c => c.status === 'accepted').length;
});

export const Trip = mongoose.model('Trip', tripSchema);
