import styles from './HowItWorks.module.css'

export const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How It Works</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Understanding Mortgage Matrix Calculations</h2>
          <p>
            Mortgage Matrix uses industry-standard financial formulas to help
            you make informed decisions about your home purchase. Our
            calculations are transparent, accurate, and designed to give you a
            clear picture of what you can afford.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Home Affordability Estimator</h2>
          <p>
            The Home Affordability Estimator helps you determine how much house
            you can afford based on your desired monthly payment. Here's how it
            works:
          </p>

          <h3>Input Parameters</h3>
          <ul className={styles.list}>
            <li>
              <strong>Desired Monthly Payment:</strong> The total amount you
              want to pay each month for your mortgage, including principal,
              interest, taxes, insurance, and HOA fees.
            </li>
            <li>
              <strong>Down Payment:</strong> The amount you plan to pay upfront
              for your home purchase.
            </li>
            <li>
              <strong>Interest Rate Range:</strong> The minimum and maximum
              interest rates you want to consider for your mortgage.
            </li>
            <li>
              <strong>Property Taxes Annually:</strong> The estimated range of
              annual property taxes for homes in your area.
            </li>
            <li>
              <strong>Insurance Annually:</strong> The estimated annual cost of
              homeowners insurance.
            </li>
            <li>
              <strong>HOA Monthly:</strong> Any monthly homeowners association
              fees (if applicable).
            </li>
          </ul>

          <div className={styles.callout}>
            <p>
              <strong>Pro Tip:</strong> For the most accurate results, research
              typical property tax rates and insurance costs in your target area
              before using the calculator.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>The Calculation Process</h2>

          <h3>
            Step 1: Calculate Available Payment for Principal and Interest
          </h3>
          <p>
            From your desired monthly payment, we subtract the monthly costs of:
          </p>
          <ul className={styles.list}>
            <li>Property taxes (annual amount ÷ 12)</li>
            <li>Insurance (annual amount ÷ 12)</li>
            <li>HOA fees (if applicable)</li>
          </ul>
          <p>
            This gives us the amount available for principal and interest
            payments.
          </p>

          <div className={styles.formula}>
            Payment for P&I = Desired Monthly Payment - Monthly Property Tax -
            Monthly Insurance - Monthly HOA
          </div>

          <h3>Step 2: Calculate Affordable Loan Amount</h3>
          <p>
            Using the payment amount for principal and interest, we calculate
            the affordable loan amount using the present value formula for an
            annuity. This is similar to Excel's PV function.
          </p>

          <div className={styles.formula}>
            Loan Amount = -PMT × ((1 - (1 + r)^-n) ÷ r) Where: PMT = Payment for
            principal and interest r = Monthly interest rate (annual rate ÷ 12 ÷
            100) n = Total number of payments (loan term in years × 12)
          </div>

          <h3>Step 3: Calculate Affordable House Price</h3>
          <p>
            We add your down payment to the affordable loan amount to determine
            the total house price you can afford.
          </p>

          <div className={styles.formula}>
            Affordable House Price = Loan Amount + Down Payment
          </div>

          <h3>Step 4: Generate Range of Affordable Prices</h3>
          <p>
            We repeat these calculations across the range of interest rates and
            property tax amounts you specified to generate a comprehensive view
            of affordable house prices under different scenarios.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Understanding the Results</h2>
          <p>
            The results show you affordable house price ranges for different
            property tax amounts. For each property tax amount, we show:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Price Range:</strong> The minimum and maximum house prices
              you can afford across your specified interest rate range.
            </li>
            <li>
              <strong>Detailed Breakdown:</strong> When you expand a result,
              you'll see specific house prices for each interest rate within
              your range.
            </li>
          </ul>
          <p>
            This allows you to understand how different interest rates and
            property tax amounts affect your home buying power.
          </p>

          <div className={styles.note}>
            <p>
              <strong>Note:</strong> Lower interest rates and lower property
              taxes allow you to afford a more expensive home with the same
              monthly payment.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Assumptions and Limitations</h2>
          <p>Our calculator makes the following assumptions:</p>
          <ul className={styles.list}>
            <li>30-year fixed-rate mortgage (unless otherwise specified)</li>
            <li>Monthly compounding of interest</li>
            <li>No private mortgage insurance (PMI) is included</li>
            <li>
              No additional costs such as closing costs or loan origination fees
            </li>
          </ul>
          <p>
            Remember that this calculator provides estimates only. Actual loan
            terms, interest rates, and affordability may vary based on your
            credit score, debt-to-income ratio, and other factors determined by
            lenders.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Making Informed Decisions</h2>
          <p>While our calculator provides valuable insights, we recommend:</p>
          <ul className={styles.list}>
            <li>
              Consulting with a mortgage professional for personalized advice
            </li>
            <li>Getting pre-approved for a mortgage before house hunting</li>
            <li>
              Considering all aspects of homeownership, including maintenance
              costs
            </li>
            <li>
              Staying within a comfortable budget rather than stretching to the
              maximum
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
