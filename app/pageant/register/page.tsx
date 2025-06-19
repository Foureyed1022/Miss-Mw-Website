import PageHeader from "@/components/page-header"
import RegistrationForm from "@/components/registration-form"

export default function RegisterPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Register for Miss Malawi 2025"
        description="Take the first step towards becoming the next Miss Malawi"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h2 className="font-playfair text-2xl font-bold text-emerald-800 mb-4">Registration Guidelines</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Thank you for your interest in participating in the Miss Malawi 2025 pageant. Before completing the
                  registration form, please ensure you meet the following eligibility criteria:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You must be a Malawian citizen by birth or naturalization.</li>
                  <li>You must be between 18 and 26 years of age as of January 1, 2025.</li>
                  <li>
                    You must have a minimum of a Malawi School Certificate of Education (MSCE) or equivalent
                    qualification.
                  </li>
                  <li>You must have never been married and have no children.</li>
                  <li>You must be of good moral character with no criminal record.</li>
                  <li>
                    You must be available for the entire pageant period and, if crowned, for the full year of reign.
                  </li>
                </ul>
                <p>
                  Please complete the registration form below with accurate information. All fields marked with an
                  asterisk (*) are required. You will need to upload recent photos of yourself as part of the
                  application process.
                </p>
                <p>
                  After submitting your registration, you will receive a confirmation email with further instructions
                  about the audition process. If you have any questions, please contact us at
                  registration@missmalawi.com.
                </p>
              </div>
            </div>

            <RegistrationForm />
          </div>
        </div>
      </section>
    </div>
  )
}
