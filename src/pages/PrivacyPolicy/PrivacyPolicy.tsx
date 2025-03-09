import styles from './PrivacyPolicy.module.css';

export const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Introduction</h2>
          <p>
            At Mortgage Matrix, we respect your privacy and are committed to protecting your personal
            data. This privacy policy will inform you about how we look after your personal data when
            you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className={styles.section}>
          <h2>The Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which
            we have grouped together as follows:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Usage Data</strong> includes information about how you use our website and
              services.
            </li>
            <li>
              <strong>Technical Data</strong> includes internet protocol (IP) address, browser type
              and version, time zone setting and location, browser plug-in types and versions,
              operating system and platform, and other technology on the devices you use to access
              this website.
            </li>
          </ul>
          <p>
            We do not collect any Special Categories of Personal Data about you (this includes
            details about your race or ethnicity, religious or philosophical beliefs, sex life,
            sexual orientation, political opinions, trade union membership, information about your
            health, and genetic and biometric data).
          </p>
        </section>

        <section className={styles.section}>
          <h2>How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use
            your personal data in the following circumstances:
          </p>
          <ul className={styles.list}>
            <li>
              To provide and maintain our service, including to monitor the usage of our service.
            </li>
            <li>
              To manage your account and provide you with customer support.
            </li>
            <li>
              To analyze how our service is used so that we can improve it.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from
            being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            In addition, we limit access to your personal data to those employees, agents,
            contractors and other third parties who have a business need to know.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to
            your personal data, including the right to request access, correction, erasure,
            restriction, transfer, to object to processing, to portability of data and (where the
            lawful ground of processing is consent) to withdraw consent.
          </p>
        </section>
      </div>
    </div>
  );
};
