import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

function AlertMessage({isVisible}) {
    return (
        <div className="absolute right-0 w-72 z-50 m-4 ">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Alert className=" backdrop-opacity-50 bg-yellow-400/90">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Done</AlertTitle>
                <AlertDescription>
                  The data has been uploaded successfully.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
}

export default AlertMessage;