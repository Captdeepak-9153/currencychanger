import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyinfo";

function App() {
  const intial = 0;
  const [amount, setAmount] = useState(intial);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyinfo = useCurrencyInfo(from);
  const options = Object.keys(currencyinfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyinfo[to])
};


  const reset = () => {
    setAmount(0); // Reset the amount to 0
    setFrom("usd"); // Reset the 'From' currency to USD
    setTo("inr"); // Reset the 'To' currency to EUR
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1565372521778-8d8235695f8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-3 rounded-lg mb-2 sm:mb-0"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
              <button
                onClick={reset}
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
