export type Pocwaitlist_JsonType = {
  poc_waitlist_page: {
    form: {
      error: {
        title: string;
        message: string;
      };
      fields: {
        name: {
          label: string;
          required: string;
        };
        email: {
          label: string;
          required: string;
        };
        phone: {
          label: string;
          required: string;
        };
        country: {
          label: string;
          required: string;
          placeholder: string;
        };
        message: {
          label: string;
          required: string;
          wordLimit: string;
        };
        companyName: {
          label: string;
          required: string;
        };
      };
      submit: {
        button: string;
        submitting: string;
      };
      heading: string;
      success: {
        title: string;
        message: string;
      };
      validation: {
        emailInvalid: string;
        nameRequired: string;
        phoneInvalid: string;
        emailRequired: string;
        nameMinLength: string;
        phoneRequired: string;
        countryRequired: string;
        messageMaxWords: string;
        messageMinWords: string;
        messageRequired: string;
      };
    };
    banner: {
      image: string;
      ctaText: string;
      heading: string;
      imageAlt: string;
      subtitle: string;
    };
  };
};