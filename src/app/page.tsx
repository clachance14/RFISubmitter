import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  FileText,
  ClipboardCheck,
  Send,
  Clock,
  BarChart4,
  FileOutput,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Streamlined RFI Management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive solution simplifies the entire RFI process from
              creation to resolution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Form-based RFI Generator",
                description:
                  "Easily create RFIs with project details, question categorization, priority levels, and attachments",
              },
              {
                icon: <FileOutput className="w-6 h-6" />,
                title: "Professional PDF Export",
                description:
                  "Generate clean, branded documents with proper formatting for client submission",
              },
              {
                icon: <Send className="w-6 h-6" />,
                title: "Email Integration",
                description:
                  "Automatically send generated RFIs to client contacts with tracking",
              },
              {
                icon: <BarChart4 className="w-6 h-6" />,
                title: "Status Tracking Dashboard",
                description:
                  "Monitor pending, submitted, and answered RFIs in real-time",
              },
              {
                icon: <ClipboardCheck className="w-6 h-6" />,
                title: "Organized Workflow",
                description:
                  "Categorize and prioritize requests to streamline project communication",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Time-Saving Automation",
                description:
                  "Reduce manual work with templates and automated notifications",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-blue-700 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our simple three-step process makes RFI management effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-700 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create RFI</h3>
              <p className="text-gray-600">
                Fill out the intuitive form with project details, questions, and
                attachments
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-700 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate & Review</h3>
              <p className="text-gray-600">
                Preview the professional PDF document and make any necessary
                adjustments
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-700 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit & Track</h3>
              <p className="text-gray-600">
                Send the RFI to clients and monitor its status through the
                dashboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-blue-100">Time Saved on RFI Processing</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">
                Construction Projects Supported
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">System Reliability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Streamline Your RFI Process?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join construction teams who have transformed their information
            request workflow.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Start Creating RFIs
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
