import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Suspense,
  lazy,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type ModalItem = {
  id: number;
  content: ReactNode;
};

type ModalContextType = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

let idCounter = 0;

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalStack, setModalStack] = useState<ModalItem[]>([]);

  const openModal = (content: ReactNode) => {
    const newModal = { id: ++idCounter, content };
    setModalStack((prev) => [...prev, newModal]);
  };

  const closeModal = () => {
    setModalStack((prev) => prev.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {modalStack.map((modal) => (
          <motion.div
            key={modal.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full"
            >
              <Suspense fallback={<div>Loading...</div>}>
                {modal.content}
              </Suspense>
              <button
                onClick={closeModal}
                className="mt-4 text-red-500 text-sm"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export function useUniversalModal() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('useUniversalModal must be used within ModalProvider');
  return context;
}
