export const formTemplates = {
  feedback: {
    title: "Customer Feedback Form",
    description: "Collect valuable feedback from your customers",
    fields: [
      { label: "Your Name", type: "TEXT", required: true, order: 0 },
      { label: "Email Address", type: "TEXT", required: true, order: 1, pattern: "^[^@]+@[^@]+\\.[^@]+$" },
      { label: "How satisfied are you?", type: "RADIO", required: true, order: 2, options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"] },
      { label: "What did you like most?", type: "TEXTAREA", required: false, order: 3 },
      { label: "What can we improve?", type: "TEXTAREA", required: false, order: 4 },
      { label: "Would you recommend us?", type: "RADIO", required: true, order: 5, options: ["Yes", "No", "Maybe"] },
    ]
  },
  registration: {
    title: "Event Registration Form",
    description: "Register for our upcoming event",
    fields: [
      { label: "Full Name", type: "TEXT", required: true, order: 0 },
      { label: "Email", type: "TEXT", required: true, order: 1, pattern: "^[^@]+@[^@]+\\.[^@]+$" },
      { label: "Phone Number", type: "TEXT", required: true, order: 2 },
      { label: "Company/Organization", type: "TEXT", required: false, order: 3 },
      { label: "Dietary Restrictions", type: "CHECKBOX", required: false, order: 4, options: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "None"] },
      { label: "T-Shirt Size", type: "RADIO", required: true, order: 5, options: ["XS", "S", "M", "L", "XL", "XXL"] },
      { label: "Additional Comments", type: "TEXTAREA", required: false, order: 6 },
    ]
  },
  survey: {
    title: "Customer Survey",
    description: "Help us understand your needs better",
    fields: [
      { label: "Age Range", type: "RADIO", required: true, order: 0, options: ["18-25", "26-35", "36-45", "46-55", "56+"] },
      { label: "How often do you use our product?", type: "RADIO", required: true, order: 1, options: ["Daily", "Weekly", "Monthly", "Rarely"] },
      { label: "Rate our customer service (1-10)", type: "NUMBER", required: true, order: 2, minValue: 1, maxValue: 10 },
      { label: "Which features do you use?", type: "CHECKBOX", required: false, order: 3, options: ["Feature A", "Feature B", "Feature C", "Feature D"] },
      { label: "What improvements would you like?", type: "TEXTAREA", required: false, order: 4 },
    ]
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with our team",
    fields: [
      { label: "Your Name", type: "TEXT", required: true, order: 0 },
      { label: "Email Address", type: "TEXT", required: true, order: 1, pattern: "^[^@]+@[^@]+\\.[^@]+$" },
      { label: "Subject", type: "TEXT", required: true, order: 2 },
      { label: "Category", type: "RADIO", required: true, order: 3, options: ["General Inquiry", "Support", "Sales", "Partnership"] },
      { label: "Message", type: "TEXTAREA", required: true, order: 4, minLength: 10 },
      { label: "Attach File (Optional)", type: "IMAGE", required: false, order: 5 },
    ]
  },
  jobApplication: {
    title: "Job Application Form",
    description: "Apply for a position at our company",
    fields: [
      { label: "Full Name", type: "TEXT", required: true, order: 0 },
      { label: "Email", type: "TEXT", required: true, order: 1, pattern: "^[^@]+@[^@]+\\.[^@]+$" },
      { label: "Phone", type: "TEXT", required: true, order: 2 },
      { label: "Position Applied For", type: "RADIO", required: true, order: 3, options: ["Software Engineer", "Product Manager", "Designer", "Marketing", "Sales"] },
      { label: "Years of Experience", type: "NUMBER", required: true, order: 4, minValue: 0, maxValue: 50 },
      { label: "Resume/CV", type: "IMAGE", required: true, order: 5 },
      { label: "Cover Letter", type: "TEXTAREA", required: false, order: 6, minLength: 50 },
      { label: "LinkedIn Profile", type: "TEXT", required: false, order: 7 },
    ]
  },
  rsvp: {
    title: "RSVP Form",
    description: "Let us know if you can attend",
    fields: [
      { label: "Your Name", type: "TEXT", required: true, order: 0 },
      { label: "Email", type: "TEXT", required: true, order: 1, pattern: "^[^@]+@[^@]+\\.[^@]+$" },
      { label: "Will you attend?", type: "RADIO", required: true, order: 2, options: ["Yes", "No", "Maybe"] },
      { label: "Number of Guests", type: "NUMBER", required: false, order: 3, minValue: 0, maxValue: 10 },
      { label: "Special Requirements", type: "TEXTAREA", required: false, order: 4 },
    ]
  }
};

export type TemplateType = keyof typeof formTemplates;
