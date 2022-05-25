/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";

import { brandColor } from "../../assets/styles/colors";
import Icon from "../Icon";
import {
  modalStyles,
  StyledModalContent,
  StyledModalCloseButton,
} from "./styles";

interface IModalProps {
  isOpen: boolean;
  isSmall?: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  isSmall,
  toggleModal,
  children,
}: IModalProps): React.ReactElement => {
  const theme = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          css={modalStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.1 } }}
        >
          <motion.div
            initial={{ y: -1000 }}
            animate={{ y: 0, transition: { delay: 0.2 } }}
            exit={{ y: -1000 }}
          >
            <StyledModalContent isSmall={isSmall}>
              <StyledModalCloseButton
                type="button"
                theme={theme}
                onClick={toggleModal}
              >
                <Icon icon="close" color={brandColor} />
              </StyledModalCloseButton>
              {children}
            </StyledModalContent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
