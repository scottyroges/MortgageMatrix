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
          <h2>Monthly Payment Calculator</h2>
          <p>
            The Monthly Payment Calculator helps you determine your total monthly
            mortgage payment based on your home price and loan details. Here's how
            it works:
          </p>

          <h3>Input Parameters</h3>
          <ul className={styles.list}>
            <li>
              <strong>Home Price:</strong> The total purchase price of the home
              you're considering.
            </li>
            <li>
              <strong>Down Payment:</strong> The amount you plan to pay upfront,
              shown both as a dollar amount and as a percentage of the home price.
            </li>
            <li>
              <strong>Length of Loan:</strong> The term of your mortgage in years
              (typically 30, 20, 15, or 10 years).
            </li>
            <li>
              <strong>Interest Rate:</strong> The annual interest rate for your
              mortgage.
            </li>
            <li>
              <strong>Taxes Annually:</strong> The estimated annual property taxes
              for the home.
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
              <strong>Pro Tip:</strong> A shorter loan term typically means higher
              monthly payments but less interest paid over the life of the loan.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Monthly Payment Calculation Process</h2>

          <h3>Step 1: Calculate Loan Amount</h3>
          <p>
            We subtract your down payment from the home price to determine the
            loan amount.
          </p>

          <div className={styles.formula}>
            Loan Amount = Home Price - Down Payment
          </div>

          <h3>Step 2: Calculate Principal and Interest Payment</h3>
          <p>
            Using the loan amount, interest rate, and loan term, we calculate
            the monthly principal and interest payment using the standard
            mortgage amortization formula.
          </p>

          <div className={styles.formula}>
            Principal & Interest = Loan Amount × [r(1+r)ⁿ] ÷ [(1+r)ⁿ-1]
            <br />
            Where:
            <br />
            r = Monthly interest rate (annual rate ÷ 12 ÷ 100)
            <br />
            n = Total number of payments (loan term in years × 12)
          </div>

          <h3>Step 3: Calculate Monthly Tax and Insurance</h3>
          <p>
            We convert the annual property tax and insurance amounts to monthly
            figures by dividing by 12.
          </p>

          <div className={styles.formula}>
            Monthly Property Tax = Annual Property Tax ÷ 12
            <br />
            Monthly Insurance = Annual Insurance ÷ 12
          </div>

          <h3>Step 4: Calculate Total Monthly Payment</h3>
          <p>
            We add the principal and interest payment, monthly property tax,
            monthly insurance, and any HOA fees to determine your total monthly
            payment.
          </p>

          <div className={styles.formula}>
            Total Monthly Payment = Principal & Interest + Monthly Property Tax + Monthly Insurance + Monthly HOA
          </div>
        </section>

        <section className={styles.section}>
          <h2>Understanding the Payment Breakdown</h2>
          <p>
            The results show your total monthly payment with a visual breakdown
            of each component:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Principal & Interest:</strong> The portion of your payment
              that goes toward paying off the loan and interest (shown in green).
            </li>
            <li>
              <strong>Property Tax:</strong> The portion that covers your property
              taxes (shown in blue).
            </li>
            <li>
              <strong>Home Insurance:</strong> The portion that covers your
              homeowners insurance (shown in amber).
            </li>
            <li>
              <strong>HOA Fees:</strong> Any homeowners association fees (shown
              in red).
            </li>
          </ul>
          <p>
            Each component is displayed with both the dollar amount and the
            percentage of your total monthly payment, helping you understand
            where your money is going each month.
          </p>

          <div className={styles.note}>
            <p>
              <strong>Note:</strong> In most cases, principal and interest will
              be the largest portion of your payment, but property taxes can also
              be significant depending on your location.
            </p>
          </div>
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
