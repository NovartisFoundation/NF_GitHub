/** @jsxImportSource @emotion/react */
import {
  loaderStyle,
  statusProgressBarStyle,
  StyledLoading,
  StyledProgressBar,
} from "./styles";

interface ILoadingProps {
  isVisible?: boolean;
  isTransparent?: boolean;
  hasProgressBar?: boolean;
  statusProgressBar?: number;
  totalStatusProgressBar?: number;
  statusProgressBarMessage?: string;
}

const Loading = ({
  isVisible = true,
  isTransparent = true,
  hasProgressBar = false,
  statusProgressBar = 0,
  totalStatusProgressBar = 0,
  statusProgressBarMessage = "",
}: ILoadingProps): React.ReactElement => (
  <StyledLoading isVisible={isVisible} isTransparent={isTransparent}>
    <h2>Loading</h2>
    <div css={loaderStyle}>
      <div />
      <div />
      <div />
      <div />
    </div>
    {hasProgressBar && (
      <>
        <StyledProgressBar
          totalStatusProgressBar={totalStatusProgressBar}
          statusProgressBar={statusProgressBar}
        />
        <div css={statusProgressBarStyle}>
          <p>
            {statusProgressBar} / {totalStatusProgressBar}
          </p>
          <p>{statusProgressBarMessage}</p>
        </div>
      </>
    )}
  </StyledLoading>
);

export default Loading;
