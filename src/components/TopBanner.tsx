'use client'

import { motion } from 'framer-motion'

export default function TopBanner() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-black text-white py-4 lg:py-5"
    >
      <div className="w-full px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-8 lg:gap-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-2xl font-medium"
            >
              Get Upto 65% off
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg lg:text-2xl font-medium"
            >
              FREE SHIPPING ON ORDERS $50+
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg lg:text-2xl font-medium"
          >
            GET YOUR $20 BONUS REWARD
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
} 