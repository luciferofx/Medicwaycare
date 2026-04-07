const mongoose = require("mongoose");
const slugify = require("slugify");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      default: ""
    },
    firstName: {
      type: String,
      trim: true,
      default: ""
    },
    lastName: {
      type: String,
      trim: true,
      default: ""
    },
    fullName: {
      type: String,
      trim: true,
      default: ""
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true
    },
    specialty: {
      type: String,
      trim: true,
      default: "General Medicine"
    },
    hospital: {
      type: ObjectId,
      ref: "Hospital"
    },
    consultationFee: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5
    },
    experience: {
      type: Number,
      min: 0,
      default: 0
    },
    languages: {
      type: [String],
      default: ["English"]
    },
    bio: {
      type: String,
      trim: true,
      default: ""
    },
    about: {
      type: String,
      trim: true,
      default: ""
    },
    categoryId: {
      type: ObjectId,
      ref: "Category"
    },
    conteryId: {
      type: ObjectId,
      ref: "Country"
    },
    subCategoryId: [{
      type: ObjectId,
      ref: "SubCategory"
    }],
    location: {
      type: Schema.Types.Mixed,
      default: {}
    },
    workAt: {
      type: String,
      trim: true,
      default: ""
    },
    medicalProblems: [{
      type: String
    }],
    medicalProcedures: [{
      type: String
    }],
    workExperience: {
      type: Schema.Types.Mixed
    },
    educationAndTraining: [{
      type: String
    }],
    honoursAndAwards: [{
      type: String
    }],
    youtubeVideo: {
      type: Schema.Types.Mixed,
      default: {}
    },
    gallery: [{
      type: String
    }],
    slug: {
      type: String,
      unique: true
    },
    image: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: true
    },
    is_active: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    is_deleted: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: "EN"
    }
  },
  { timestamps: true }
);

doctorSchema.pre("save", function (next) {
  // If firstName/lastName are missing but name is provided, use name as fullName
  if (!this.firstName && !this.lastName && this.name) {
    this.fullName = this.name;
  } else if (this.isModified("firstName") || this.isModified("lastName") || !this.fullName) {
    this.fullName = `${this.firstName || ""} ${this.lastName || ""}`.trim();
  }

  // Ensure slug is generated from fullName
  if (this.isModified("fullName") || !this.slug) {
    const slugSource = this.fullName || this.name || "doctor";
    this.slug = slugify(slugSource, {
      lower: true,
      strict: true,
    });
  }
  next();
});

const DoctorModel = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema, "doctors");
module.exports = DoctorModel;
