// @flow

import type { Items, ItemStats } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Item from 'features/Character/components/Item';
import applyAttributes from 'lib/gw2/itemStats';

import styles from './styles.less';

function mapStateToProps (state) {
  return {
    items: state.items,
    itemStats: state.itemStats,
  };
}

type Props = {
  items?: Items,
  itemStats?: ItemStats,
  fetchItems?: (ids: Array<number>) => void,
  // XXX: Why flow doesn't accept number in ids?
  fetchItemStats?: (ids: Array<mixed>) => void,
  ids: Array<number>,
  className?: string,
  mode?: 'rune' | 'item',
  statIds: { [key: number]: number },
};

@connect(mapStateToProps, {
  fetchItems: actions.fetchItems,
  fetchItemStats: actions.fetchItemStats,
})
export default class ItemsEmbed extends Component {
  props: Props;

  static renderItem (id: number, mode?: 'rune' | 'item', statId?: number, items?: Items, itemStats?: ItemStats) {
    const item = items && items[id];
    const selectedStat = statId && itemStats && itemStats[statId];

    // no item to render, skip.
    if (!item) {
      return undefined;
    }

    // Apply stat on item.
    if (selectedStat && item.details && !item.details.infix_upgrade_applied) {
      const attributes = applyAttributes(item, selectedStat);

      item.name = `${selectedStat.name} ${item.name}`;
      item.details.infix_upgrade = {
        id: selectedStat.id,
        attributes,
      };
      item.details.infix_upgrade_applied = true;
    }

    return (<Item
      key={id}
      item={item}
      name={mode === 'rune' ? 'Rune' : undefined}
      tooltipType={mode === 'rune' ? 'amulets' : undefined}
      className={styles.item}
    />);
  }

  componentWillMount () {
    const { ids, statIds, fetchItems, fetchItemStats } = this.props;

    fetchItems && fetchItems(ids);
    fetchItemStats && fetchItemStats(Object.values(statIds));
  }

  render () {
    const { ids, statIds, items, itemStats, className, mode } = this.props;

    return (
      <div className={className}>
        {ids.map((id) => ItemsEmbed.renderItem(id, mode, statIds[id], items, itemStats))}
      </div>
    );
  }
}
