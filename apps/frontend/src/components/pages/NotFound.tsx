import { Button } from "../ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";

function NotFound() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col items-center text-center gap-4"
      >
        <h1 className="text-6xl font-semibold">404</h1>

        <p className="text-muted-foreground text-sm max-w-md">
          This page doesn’t exist. Either you typed something wrong, or your
          routing decided to emotionally detach.
        </p>

        {
            pathname === "*" && (
                <div className="flex gap-2 pt-2">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="rounded-xl"
                    >
                        Go Back
                    </Button>

                    <Button
                        onClick={() => navigate("/dashboard")}
                        className="rounded-xl"
                    >
                        Dashboard
                    </Button>
                </div>
            )
        }
      </motion.div>
    </div>
  );
}

export default NotFound;