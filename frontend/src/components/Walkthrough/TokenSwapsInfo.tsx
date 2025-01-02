import React from "react";

const TokenSwapsInfo = () => {

  const handleClick = () => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };


  return (
    <div>
      <div>
        <button
          className="btn text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleClick}
        >
          Show Info About Swapping Tokens
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="py-4 text-xl">
              <p>
                In this section, we’ll be swapping tokens within the liquidity
                pool.
              </p>
              <br />
              <p>
                To perform a token swap, first ensure that the tokens you intend
                to swap are approved for spending by the pools contract. This
                allows the pool to transfer the tokens on your behalf during the
                swap process.
              </p>
              <br />
              <p>
                You will need to specify three main values for a token swap: the
                token youre swapping from (Token A), the token you wish to
                receive (Token B), and the quantity of Token A you want to
                exchange. Based on the pool’s current rates, you’ll receive a
                calculated amount of Token B after the swap.
              </p>
              <br />
              <p>
                Once the transaction completes, your balance will be updated to
                reflect the new token holdings, and the pool’s liquidity will be
                adjusted accordingly.
              </p>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TokenSwapsInfo;
