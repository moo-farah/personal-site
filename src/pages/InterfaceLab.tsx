import {motion} from 'framer-motion'
import { FadeInSection } from "../utils/FadeInSection"

const InterfaceLab = () => {
  return (
    <div className='pb-20'>
     <FadeInSection>
        <motion.h1 className="text-3xl font-bold">
          Interface Lab
        </motion.h1>
        <motion.p className="text-sm sm:text-base leading-relaxed mb-6">
          A playground where I prototype interfaces and build cool motion experiments.
          <p className='text-sm sm:text-base leading-relaxed mb-6'>
            This page is a work in progress!!
          </p>
        </motion.p>
      </FadeInSection>
    </div>
  )
}

export default InterfaceLab