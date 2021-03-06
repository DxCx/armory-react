// @flow

import type { TabInput as Tabs$TabInput } from 'common/components/Tabs';

import ContentCard from 'common/components/ContentCard';
import Tabs from 'common/components/Tabs';
import Head from 'common/components/Head';
import SocialButtons from 'common/components/SocialButtons';
import Tooltip from 'common/components/Tooltip';
import Container from 'common/components/Container';
import DisplayAd from 'common/components/DisplayAd';

import styles from './styles.less';

type Props = {
  children?: any,
  extraContent?: any,
  tabs?: Array<Tabs$TabInput>,
  title: string,
  description?: string,
  cardExtra?: any,
  pinnedTab?: any,
};

const Content = ({
  children,
  extraContent,
  tabs,
  title,
  description,
  cardExtra,
  pinnedTab,
  ...props
}: Props) => (
  <div className={styles.root}>
    <Head title={title} description={description} />
    <SocialButtons />

    <DisplayAd className={styles.ad} />

    <div className={styles.heroBg}>

      <Container className={styles.inner}>
        <ContentCard {...props} size="big">{cardExtra}</ContentCard>
        {extraContent}
      </Container>
    </div>

    {tabs && <Tabs titleSuffix={title} tabs={tabs} pinnedTab={pinnedTab} />}

    {children}

    <DisplayAd className={styles.ad} />
    <Tooltip />
  </div>
);

export default Content;
