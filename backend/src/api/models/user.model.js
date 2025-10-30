import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        match: [/^[6-9]\d{9}$/, 'Please provide a valid Indian phone number']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['traveler', 'companion', 'guide', 'vendor', 'tourism_admin'],
        default: 'traveler'
    },
    avatar: {
        type: String,
        default: null
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer_not_to_say'],
        required: true
    },
    
    // KYC Information
    kyc: {
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationMethod: {
            type: String,
            enum: ['aadhaar', 'pan', 'passport', 'driving_license', 'voter_id'],
            default: null
        },
        documentNumber: {
            type: String,
            default: null,
            select: false
        },
        documentImage: {
            type: String,
            default: null
        },
        verifiedAt: {
            type: Date,
            default: null
        },
        verificationStatus: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'not_submitted'],
            default: 'not_submitted'
        },
        rejectionReason: {
            type: String,
            default: null
        }
    },

    // Address Information
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: {
            type: String,
            default: 'India'
        }
    },

    // Emergency Contact
    emergencyContact: {
        name: String,
        relation: String,
        phoneNumber: String
    },

    // Travel Preferences
    travelPreferences: {
        interests: [{
            type: String,
            enum: ['adventure', 'cultural', 'religious', 'beach', 'mountain', 'wildlife', 'historical', 'food', 'shopping', 'relaxation']
        }],
        budget: {
            type: String,
            enum: ['budget', 'moderate', 'luxury'],
            default: 'moderate'
        },
        travelStyle: {
            type: String,
            enum: ['solo', 'couple', 'family', 'group'],
            default: 'solo'
        }
    },

    // Companion-specific fields
    companionProfile: {
        isAvailable: {
            type: Boolean,
            default: false
        },
        bio: String,
        languages: [String],
        expertise: [String],
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        totalTrips: {
            type: Number,
            default: 0
        },
        pricePerDay: {
            type: Number,
            default: 0
        }
    },

    // Security & Account Status
    isActive: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        select: false
    },
    lastLogin: {
        type: Date,
        default: null
    },
    
    // Safety Features
    sosContacts: [{
        name: String,
        phoneNumber: String,
        relation: String
    }],
    
    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

}, { 
    timestamps: true 
});

// Index for search optimization
userSchema.index({ email: 1, phoneNumber: 1 });
userSchema.index({ 'kyc.isVerified': 1, role: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model('User', userSchema);
