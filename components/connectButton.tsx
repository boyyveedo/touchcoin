import { ConnectButton } from "@rainbow-me/rainbowkit";

export const CustomBtn = ({children}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {

        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="claim-container"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn d-flex"
                    onClick={openConnectModal}
                    type="button"
                  >
                    {children}
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              if (account) {      
                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={openAccountModal} type="button" className="">
                      {account.displayName}
                     
                    </button>
                  </div>
                );
              } else {
                return (
                  <button
                    className=""
                    onClick={openConnectModal}
                    type="button"
                  >
                    {children}
                  </button>
                );
              }
            }
              )()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
