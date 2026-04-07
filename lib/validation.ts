import { z } from "zod";

// Helper for file validation
const fileSchema = z.instanceof(File).superRefine((file, ctx) => {
  if (file.size === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "File is required",
    });
  }
});

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Invalid email address").max(100),
  phone: z.string()
    .min(1, "Phone number is required")
    .max(20)
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number format"),
  dob: z.string()
    .min(1, "Date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine(date => {
      const dobDate = new Date(date);
      const today = new Date();
      const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      return dobDate <= minAgeDate;
  }, "You must be at least 18 years old"),
  age: z.coerce.number()
    .int("Age must be a whole number")
    .min(18, "You must be at least 18 years old")
    .max(29, "Maximum age is 29 years"),
  address: z.string().min(1, "Address is required").max(200),
  city: z.string().min(1, "City is required").max(100),
  country: z.string().min(1, "Country is required").max(100),
});

export const experienceSchema = z.object({
  education: z.string().min(1, "Education level is required").max(100),
  occupation: z.string().min(1, "Occupation is required").max(100),
  languages: z.string().min(1, "Languages are required").max(200),
  height: z.coerce.number()
    .int("Height must be a whole number")
    .min(140, "Height must be at least 140cm")
    .max(220, "Height must be at most 220cm"),
  previousPageants: z.string().max(500).optional(),
  talents: z.string().max(500).optional(),
  communityService: z.string().max(500).optional(),
  whyJoin: z.string()
    .min(10, "Please provide a detailed response (minimum 10 characters)")
    .max(500),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DOC_SIZE = 2 * 1024 * 1024; // 2MB

const imageFileSchema = fileSchema
  .refine(file => file.size <= MAX_FILE_SIZE, "File size must be less than 5MB")
  .refine(file => file.type.startsWith("image/"), "Only image files are allowed");

const documentFileSchema = fileSchema
  .refine(file => file.size <= MAX_DOC_SIZE, "File size must be less than 2MB")
  .refine(file => 
    file.type.startsWith("image/") || 
    file.type === "application/pdf",
    "Only PDF or image files are allowed"
  );

export const documentsSchema = z.object({
  headshotPhoto: imageFileSchema.optional(),
  fullLengthPhoto: imageFileSchema.optional(),
  consentletter: documentFileSchema.optional(),
  idProof: documentFileSchema.optional(),
  termsAccepted: z.boolean().optional(),
});

export const paymentSchema = z.object({
  paymentMethod: z.enum(["Paychangu"], {
  }),
});

export const applicationSchema = personalInfoSchema
  .merge(experienceSchema)
  .merge(documentsSchema)
  .merge(paymentSchema);

// Strict schema for final submission validation
export const finalApplicationSchema = personalInfoSchema
  .merge(experienceSchema)
  .merge(z.object({
    headshotPhoto: imageFileSchema,
    fullLengthPhoto: imageFileSchema,
    consentletter: documentFileSchema,
    idProof: documentFileSchema,
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  }))
  .merge(paymentSchema);

export type ApplicationSchema = z.infer<typeof applicationSchema>;