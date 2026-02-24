import React from "react";

const FormSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20" id="partner-form">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-3xl bg-white p-10 shadow-xl md:p-16">
          {/* Heading */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900">
              Ready to Partner with Us?
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Let’s explore how we can work together.
              <br />
              Fill out the form and our team will be in touch.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Your name*
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Your job title
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Your business email*
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Your Phone Number
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Company Website */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Company website
                </label>
                <input
                  type="url"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            {/* Privacy */}
            <p className="text-sm leading-relaxed text-gray-500">
              Your privacy is important to us. This form collects your name,
              phone and email so that we can answer your request.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled
              className="mt-6 cursor-not-allowed rounded-full bg-gray-200 px-10 py-4 font-semibold text-gray-400"
            >
              Submit request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
