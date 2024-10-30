"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useIsMutating, useIsFetching } from "@tanstack/react-query";
import { CloseButton, LoadingSpinner } from "../../ui/atoms";
import { BoxError, BoxSuccess } from "../../ui/molecules";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type UiProviderProps = {
  children: ReactNode;
};
type UiContextData = {
  clearModalProps: Function;
  showModal: Function;
  loading: boolean;
  setLoading: Function;
  setModalBody: Function;
  setModalFooter: Function;
  modalHeaderDescription: string;
  setModalHeaderDescription: Function;
};
const UiContext = createContext({} as UiContextData);
export function UiProvider({ children }: UiProviderProps) {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const [modalHeaderText, setModalHeaderText] = useState("");
  const [modalHeaderDescription, setModalHeaderDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalBody, setModalBody] = useState<ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [modalFooter, setModalFooter] = useState<ReactNode>(
    <CloseButton onClose={onClose} />,
  );
  const showModal = ({
    newModalFooter = <CloseButton onClose={onClose} />,
    newModalBody = null,
    title = "Atenção",
    subtitle = undefined,
    type = null,
    content = "",
  }) => {
    setModalFooter(newModalFooter);
    setModalBody(
      newModalBody ?? type === "error" ? (
        <BoxError title={subtitle} content={content} />
      ) : type === "success" ? (
        <BoxSuccess title={subtitle} content={content} />
      ) : null,
    );
    setModalHeaderText(title);
    if (subtitle) {
      setModalHeaderDescription(subtitle);
    }
    onOpen();
  };
  const clearModalProps = () => {
    setModalFooter(<Button onClick={onClose}>Fechar</Button>);
    setModalBody(<></>);
    setModalHeaderText("");
  };
  const loadingSpinner = !!isFetching || !!isMutating || loading;
  return (
    <UiContext.Provider
      value={{
        clearModalProps,
        showModal,
        loading: loadingSpinner,
        setLoading,
        setModalBody,
        setModalFooter,
        modalHeaderDescription,
        setModalHeaderDescription,
      }}
    >
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalHeaderText}</DialogTitle>
            <DialogDescription>{modalHeaderDescription}</DialogDescription>
          </DialogHeader>
          {modalBody}
          <DialogFooter>{modalFooter}</DialogFooter>
        </DialogContent>
      </Dialog>
      {loadingSpinner && (
        <LoadingSpinner className="absolute top-0 left-0 right-0 bottom-0 m-auto" />
      )}
    </UiContext.Provider>
  );
}
export const useUi = () => useContext(UiContext);
