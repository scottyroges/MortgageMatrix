import styles from './TermsOfService.module.css'

export const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms of Service</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Introduction</h2>
          <p>
            Welcome to Mortgage Matrix. These Terms of Service govern your use
            of our website and services. By accessing or using Mortgage Matrix,
            you agree to be bound by these Terms. Please read them carefully.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Use of Services</h2>
          <p>
            Mortgage Matrix provides tools and calculators for mortgage
            estimation and comparison. Our services are provided for
            informational purposes only and should not be considered financial
            advice. We make no guarantees regarding the accuracy of calculations
            or their applicability to your specific financial situation.
          </p>
          <p>
            You agree to use our services only for lawful purposes and in
            accordance with these Terms. You are responsible for ensuring that
            your use of our services complies with applicable laws and
            regulations.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Intellectual Property</h2>
          <p>
            All content, features, and functionality of our services, including
            but not limited to text, graphics, logos, icons, images, audio
            clips, and software, are the exclusive property of Mortgage Matrix
            or its licensors and are protected by copyright, trademark, and
            other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works
            of, publicly display, publicly perform, republish, download, store,
            or transmit any of the material on our website without our express
            prior written consent.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" and "as available" without any
            warranties of any kind, either express or implied. We do not
            guarantee that our services will be uninterrupted, timely, secure,
            or error-free.
          </p>
          <p>
            The calculations and estimates provided by our tools are based on
            the information you provide and general assumptions. They may not
            reflect actual loan terms available to you from lenders. You should
            consult with qualified financial professionals before making any
            financial decisions.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Mortgage Matrix shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to loss of profits,
            data, use, goodwill, or other intangible losses, resulting from your
            access to or use of or inability to access or use our services.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes to Terms</h2>
          <p>
            We may revise these Terms from time to time. The most current
            version will always be posted on our website. By continuing to use
            our services after any changes, you accept and agree to the revised
            Terms.
          </p>
        </section>
      </div>
    </div>
  )
}
