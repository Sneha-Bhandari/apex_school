
"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Validation Schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("First name is required"),

  middleName: Yup.string(),

  lastName: Yup.string()
    .trim()
    .required("Last name is required"),

  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  parentContact: Yup.string()
    .matches(
      /^[0-9+\-\s()]{7,20}$/,
      "Please enter a valid contact number"
    )
    .required("Parent contact number is required"),

  class: Yup.string()
    .trim()
    .required("Class is required"),

  remarks: Yup.string(),
});

// Initial Values
const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  email: "",
  parentContact: "",
  class: "",
  remarks: "",
};

const AdmissionForm = () => {
  const [serverError, setServerError] = useState("");

  // POST API
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setServerError("");

    try {
      const formData = new FormData();

      formData.append("firstName", values.firstName.trim());
      formData.append("middleName", values.middleName.trim());
      formData.append("lastName", values.lastName.trim());

      formData.append(
        "dob",
        new Date(`${values.dob}T00:00:00.000Z`).toISOString()
      );

      formData.append("email", values.email.trim());
      formData.append("parentContact", values.parentContact.trim());
      formData.append("class", values.class.trim());
      formData.append("remarks", values.remarks.trim());

      const response = await fetch(`${API_URL}/admission-requests`, {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();

      let result = {};

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        result = { message: responseText };
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to submit admission request"
        );
      }

      toast.success("Admission request submitted successfully!");

      resetForm();

    } catch (error) {
      console.error("Admission submission error:", error);

      const message =
        error.message || "Something went wrong. Please try again.";

      setServerError(message);
      toast.error(message);

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="bg-[#222052] px-6 sm:px-8 py-5 relative overflow-hidden">
            <h2 className="text-white text-xl font-semibold">
              Admission Form
            </h2>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="p-6 sm:p-10 lg:p-8">

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-6">

                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm text-gray-700 mb-2"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>

                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter first name"
                      className={`w-full h-12 px-4 rounded-lg border bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-[#222052] focus:ring-4 focus:ring-[#222052]/10 ${
                        touched.firstName && errors.firstName
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                    />

                    {touched.firstName && errors.firstName && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Middle Name */}
                  <div>
                    <label
                      htmlFor="middleName"
                      className="block text-sm text-gray-700 mb-2"
                    >
                      Middle Name
                    </label>

                    <Field
                      id="middleName"
                      name="middleName"
                      type="text"
                      placeholder="Enter middle name (optional)"
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-[#222052] focus:ring-4 focus:ring-[#222052]/10"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm text-gray-700 mb-2"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>

                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter last name"
                      className={`w-full h-12 px-4 rounded-lg border bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-[#222052] focus:ring-4 focus:ring-[#222052]/10 ${
                        touched.lastName && errors.lastName
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                    />

                    {touched.lastName && errors.lastName && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label
                      htmlFor="dob"
                      className="block text-sm text-gray-700 mb-2"
                    >
                      Date of Birth <span className="text-red-500">*</span>
                    </label>

                    <Field
                      id="dob"
                      name="dob"
                      type="date"
                      max={new Date().toISOString().split("T")[0]}
                      className={`w-full h-12 px-4 rounded-lg border bg-gray-50 text-sm text-gray-700 outline-none transition-all focus:bg-white focus:border-[#222052] focus:ring-4 focus:ring-[#222052]/10 ${
                        touched.dob && errors.dob
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                    />

                    {touched.dob && errors.dob && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.dob}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-gray-700 mb-2"
                    >
                      Parent Email Address <span className="text-red-500">*</span>
                    </label>

                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      className={`w-full h-12 px-4 rounded-lg border bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-[#222052] focus:ring-4 focus:ring-[#222052]/10 ${
                        touched.email && errors.email
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                    />

                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Parent Contact */}
                  <div>
                    <label
                      htmlFor="parentContact"
                      className="block text-sm text-gray-700 mb-2"
                    >
                      Parent Contact Number <span className="text-red-500">*</span>
                    </label>

                    <Field
                      id="parentContact"
                      name="parentContact"
                      type="tel"
                      placeholder="Enter contact number"
                      className={`w-full h-12 px-4 rounded-lg border bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-[#222052] focus:ring-4 focus:ring-[#222052]/10 ${
                        touched.parentContact && errors.parentContact
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                    />

                    {touched.parentContact && errors.parentContact && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.parentContact}
                      </p>
                    )}
                  </div>

                  {/* Class */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="class"
                      className="block text-sm text-gray-700 mb-2"
                    >
                      Applying For Class <span className="text-red-500">*</span>
                    </label>

                    <Field
                      id="class"
                      name="class"
                      type="text"
                      placeholder="Enter the class you are applying for"
                      className={`w-full h-12 px-4 rounded-lg border bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-[#222052] focus:ring-4 focus:ring-[#222052]/10 ${
                        touched.class && errors.class
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                    />

                    {touched.class && errors.class && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.class}
                      </p>
                    )}
                  </div>

                  {/* Remarks */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="remarks"
                      className="block text-sm text-gray-700 mb-2"
                    >
                      Additional Remarks
                     
                    </label>

                    <Field
                      as="textarea"
                      id="remarks"
                      name="remarks"
                      rows="4"
                      placeholder="Write any additional information...."
                      className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-[#222052] focus:ring-4 focus:ring-[#222052]/10 resize-none"
                    />
                  </div>

                </div>

                {/* Server Error */}
                {serverError && (
                  <div className="mt-5 p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600">
                      {serverError}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center cursor-pointer justify-center gap-2 bg-[#222052] hover:bg-[#30296e] text-white text-sm font-semibold px-8 py-3.5 rounded-lg shadow-md shadow-[#222052]/20 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>

                </div>

              </Form>
            )}
          </Formik>

        </div>

      </div>
    </section>
  );
};

export default AdmissionForm;
