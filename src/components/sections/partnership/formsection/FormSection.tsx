import React from "react";

const FormSection: React.FC = () => {
  return <section className="bg-gray-50 py-20" id="partner-form">
  <div className="max-w-5xl mx-auto px-4">
    <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Ready to Partner with Us?
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Let’s explore how we can work together.<br />
          Fill out the form and our team will be in touch.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-8">
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Your name*
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Your job title
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Your business email*
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Company
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Company Website */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Company website
          </label>
          <input
            type="url"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-4">
          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300" />
            I agree to be contacted by Exacaster using my name and email.
          </label>

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300" />
            I agree to receive product updates and news from Exacaster.
          </label>
        </div>

        {/* Privacy */}
        <p className="text-sm text-gray-500 leading-relaxed">
          Your privacy is important to us. This form collects your name, phone and email
          so that we can answer your request. Check our{" "}
          <a href="#" className="underline text-gray-900 hover:text-black">
            privacy policy
          </a>{" "}
          for the full story on how we protect and manage your submitted data.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled
          className="mt-6 rounded-full bg-gray-200 px-10 py-4 font-semibold text-gray-400 cursor-not-allowed"
        >
          Submit request
        </button>

      </form>
    </div>
  </div>
</section>
;
};

export default FormSection;