import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MapPin, Clock, FileText } from "lucide-react";
import Button from "../../../tailadminsrc/components/ui/button/Button";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const GetInTouch = () => {
  return (
    <section className="py-16 px-4 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit our office, call our hotlines, or reach out online. We're here
            to serve you
            <br className="hidden sm:block" />
            with dedication and transparency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6">
              {/* Address */}
              <motion.div
                variants={fadeUp}
                custom={0.1}
                className="flex items-center space-x-4 hover:translate-y-[-3px] transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-lg flex items-center text-text-color-light justify-center shrink-0 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-foreground">
                    Address
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Barangay Hall, Culiat, Quezon City
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Metro Manila, Philippines
                  </p>
                </div>
              </motion.div>

              {/* Phone Numbers */}
              <motion.div
                variants={fadeUp}
                custom={0.2}
                className="flex items-center space-x-4 hover:translate-y-[-3px] transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-lg flex items-center text-text-color-light justify-center shrink-0 shadow-sm">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-foreground">
                    Phone Numbers
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Main Line: (02) 8123-4567
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Emergency Hotline: 0919-000-0000
                  </p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                variants={fadeUp}
                custom={0.3}
                className="flex items-center space-x-4 hover:translate-y-[-3px] transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-lg flex items-center text-text-color-light justify-center shrink-0 shadow-sm">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-foreground">Email</h4>
                  <p className="text-sm text-muted-foreground">
                    info@barangayculiat.gov.ph
                  </p>
                  <p className="text-sm text-muted-foreground">
                    services@barangayculiat.gov.ph
                  </p>
                </div>
              </motion.div>

              {/* Office Hours */}
              <motion.div
                variants={fadeUp}
                custom={0.4}
                className="flex items-center space-x-4 hover:translate-y-[-3px] transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-lg flex items-center text-text-color-light justify-center shrink-0 shadow-sm">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-foreground">
                    Office Hours
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 8:00 AM - 5:00 PM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Saturday: 9:00 AM - 12:00 PM
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div variants={fadeUp} custom={0.5} className="mt-8">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Transparency Report",
                  "Privacy Policy",
                  "Feedback Form",
                  "FAQ",
                ].map((link, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-secondary transition-colors"
                  >
                    <FileText size={16} className="text-secondary" />
                    <span>{link}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Send us a Message Form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.6}
            className="bg-card border border-text-secondary/30 rounded-lg p-8 shadow-md bg-light"
          >
            <h3 className="text-xl font-bold mb-6">Send us a Message</h3>

            <form className="space-y-4">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["First Name", "Last Name"].map((label, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium mb-2">
                      {label} <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={`Enter your ${label.toLowerCase()}`}
                      className="w-full px-4 py-2 border border-text-secondary/30 rounded-lg focus:ring focus:ring-secondary outline-none transition-all bg-background"
                    />
                  </div>
                ))}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address <span className="text-secondary">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 border border-text-secondary/30 rounded-lg focus:ring focus:ring-secondary outline-none transition-all bg-background"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject <span className="text-secondary">*</span>
                </label>
                <select className="w-full px-4 py-2 border border-text-secondary/30 rounded-lg focus:ring focus:ring-secondary bg-background outline-none transition-all">
                  <option>Select a subject</option>
                  <option>Document Request</option>
                  <option>General Inquiry</option>
                  <option>Complaint</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message <span className="text-secondary">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2 border border-text-secondary/30 rounded-lg focus:ring focus:ring-secondary outline-none transition-all bg-background resize-none"
                ></textarea>
              </div>

              {/* Privacy Checkbox */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1 w-4 h-4 text-secondary border-border rounded focus:ring-secondary"
                />
                <label
                  htmlFor="privacy"
                  className="text-sm text-muted-foreground"
                >
                  I agree to the{" "}
                  <a href="#" className="text-secondary hover:underline">
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-secondary hover:underline">
                    terms of service
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="w-full font-medium transition-all duration-200"
                startIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                }
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
