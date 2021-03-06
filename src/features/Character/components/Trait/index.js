// @flow

import cx from 'classnames';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';
import colours from 'common/styles/colours';

import styles from './styles.less';

type Props = {
  data?: {
    icon?: string,
  },
  className?: string,
  active?: boolean,
};

const Trait = ({ data, className, active }: Props) => (
  <TooltipTrigger type="trait" data={data}>
    <Icon
      className={cx(styles.root, className, { [styles.active]: active })}
      src={data && data.icon}
      style={{ backgroundColor: data && data.icon && colours._black }}
    />
  </TooltipTrigger>
);

export default Trait;
