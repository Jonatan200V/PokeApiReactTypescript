import { featuresValue } from '../../types/types';

interface CarectiristicasProps {
  features: featuresValue;
}
const Carectiristicas = ({ features }: CarectiristicasProps) => {
  return (
    <div className='features'>
      <span className='features__span'>
        {features.name.replace(
          features.name[0],
          features.name[0].toUpperCase()
        )}
        :
      </span>
      <span className='features__span'>{features.stat}</span>
    </div>
  );
};

export default Carectiristicas;
