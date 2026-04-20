import {motion} from 'framer-motion'
import { FadeInSection } from "../utils/FadeInSection"

const Stack = () => {
  return (
    <div className='pb-20'>
     <FadeInSection>
        <motion.h1 className="text-3xl font-bold">
          Stack
        </motion.h1>
        <motion.p className="text-sm sm:text-base leading-relaxed mb-6">
          The stack I use.
        </motion.p>
      </FadeInSection>
    
    </div>
  )
}

export default Stack
