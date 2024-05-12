import React from 'react';
import { motion } from 'framer-motion';

const DownloadSign: React.FC = () => {
  return (
  
      <motion.div
        className="download-sign"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      ></motion.div>
   
  );
};

export default DownloadSign;