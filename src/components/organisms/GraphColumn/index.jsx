/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import { addDays, format, getTime, subDays } from 'date-fns';
import React, { useMemo, useState, useEffect } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { convertReadable, getDateObject } from '../../../helpers/common';
import TableBox from '../TableBox';
import { GraphCol, Head, IconBox, TextBox, Title, Value, GraphBox, BtnSwitch, Button } from './GraphColumn.style';

const GraphGradient = title => {
  switch (title) {
    case 'Total Transactions':
      return (
        <defs>
          <linearGradient id="transactions">
            <stop offset="0%" stopColor="#625FFB" />
            <stop offset="40%" stopColor="#ADA7FF" />
            <stop offset="70%" stopColor="#625FFB" />
          </linearGradient>
        </defs>
      );

    case 'Rewards Points Summary':
      return (
        <defs>
          <linearGradient id="summary">
            <stop offset="50%" stopColor="#28D094" />
            <stop offset="60%" stopColor="#B4DE70" />
          </linearGradient>
        </defs>
      );

    case 'Amount Owed to Plastk':
      return (
        <defs>
          <linearGradient id="amount">
            <stop offset="0%" stopColor="#FF6565" />
            <stop offset="40%" stopColor="#FC7651" />
          </linearGradient>
        </defs>
      );

    case 'Impressions':
      return (
        <defs>
          <linearGradient id="impressions">
            <stop offset="40%" stopColor="#4490FA" />
            <stop offset="50%" stopColor="#44B8FA" />
          </linearGradient>
        </defs>
      );

    case 'Clicks':
      return (
        <defs>
          <linearGradient id="clicks">
            <stop offset="50%" stopColor="#36C0DB" />
            <stop offset="60%" stopColor="#9AECCD" />
          </linearGradient>
        </defs>
      );

    case 'Conversions':
      return (
        <defs>
          <linearGradient id="conversions">
            <stop offset="50%" stopColor="#D62F68" />
            <stop offset="50%" stopColor="#F62E74" />
          </linearGradient>
        </defs>
      );

    default:
      return (
        <defs>
          <linearGradient id="transactions">
            <stop offset="0%" stopColor="#625FFB" />
            <stop offset="40%" stopColor="#ADA7FF" />
            <stop offset="70%" stopColor="#625FFB" />
          </linearGradient>
        </defs>
      );
  }
};

const StrokeID = title => {
  switch (title) {
    case 'Total Transactions':
      return '#transactions';
    case 'Rewards Points Summary':
      return '#summary';
    case 'Amount Owed to Plastk':
      return '#amount';
    case 'Impressions':
      return '#impressions';
    case 'Clicks':
      return '#clicks';
    case 'Conversions':
      return '#conversions';
    default:
      return '#transactions';
  }
};

function GraphColumn({ iconImg, title, value, bg, data, group, dateRange, graphType, columnName, ...props }) {
  const [tableView, setTableView] = useState(false);
  const [chartData, setChartData] = useState([]);
  const renderCustomAxisTickYaxis = _ => convertReadable(_);
  const renderCustomAxisTickXaxis = _ => {
    // eslint-disable-next-line no-shadow
    const { date_key } = data?.find(({ date_key }) => date_key === _) ?? { date: 0 };
    let _title = '';
    switch (group) {
      case 'day':
        _title = `${format(getDateObject(date_key), 'HH')}Hr`;
        break;
      case 'week':
        _title = format(getDateObject(date_key), 'EEE');
        break;
      case 'year':
        _title = format(getDateObject(date_key), 'MMMyy');
        break;
      default:
        _title = format(getDateObject(date_key), 'dd MMMyy');
    }

    return _title;
  };

  useEffect(() => {
    const _data = data.map(({ date_key }) => date_key);
    if (_data.length === 1) {
      const arr = [];
      arr.push({ date_key: getTime(subDays(_data[0], 2)), date: 0, amount: 0 });
      arr.push({ date_key: getTime(subDays(_data[0], 1)), date: 1, amount: 0 });
      arr.push({ date_key: _data[0], date: 2, amount: data[0].amount });
      arr.push({ date_key: getTime(addDays(_data[0], 1)), date: 1, amount: 0 });
      arr.push({ date_key: getTime(addDays(_data[0], 2)), date: 1, amount: 0 });
      arr.push({ date_key: getTime(addDays(_data[0], 3)), date: 1, amount: 0 });
      setChartData(arr);
    } else {
      setChartData(data);
    }
  }, [data]);

  const getXTicks = useMemo(() => {
    const _data = data.map(({ date_key }) => date_key);
    if (_data?.length === 1) return [0, _data[Math.floor(_data.length / 2)], _data[0]];

    return [_data[0], _data[Math.floor(_data.length / 2)], _data[_data.length - 1]];
  }, [data, group]);

  const getYTicks = useMemo(() => {
    const arr = data.map(({ amount = 0 }) => parseFloat(amount)).sort((a, b) => a - b);
    const sum = arr.reduce((a, b) => a + b, 0);

    let my_arr = [];
    if (arr?.length === 1) {
      my_arr = [
        `${(arr[arr.length - 1] / 3).toFixed(2)}`,
        `${((arr[arr.length - 1] / 3) * 2).toFixed(2)}`,
        `${arr[arr.length - 1]}`,
      ];
    } else {
      my_arr = [`0`, `${sum / 3}`, `${(sum / 3) * 2}`, `${sum}`];
    }

    return my_arr.map(tick => {
      const _tick = Math.ceil(tick);
      const final = _tick % 2 !== 0 && _tick > 1 ? _tick + 1 : _tick;

      return final;
    });
  }, [data, group]);
  const renderCustomToolTip = _ =>
    group === 'day' ? format(getDateObject(_), 'MMM ,dd,yyyy hh:mm a') : format(getDateObject(_), 'MMM ,dd,yyyy');
  return (
    <>
      <GraphCol title={title} {...props}>
        <Head>
          <IconBox>{iconImg}</IconBox>
          <TextBox>
            <Title>{title}</Title>
            <Value>{value}</Value>
          </TextBox>
          <BtnSwitch>
            <Button type="button" onClick={() => setTableView(!tableView)}>
              {tableView ? <i className="icon-linegraphs" /> : <i className="icon-bill" />}
            </Button>
          </BtnSwitch>
        </Head>
        {tableView && (
          <TableBox data={data} total_transactions={value} column={columnName} graphType={graphType} group={group} />
        )}
        {!tableView && (
          <GraphBox>
            <ResponsiveContainer minWidth={200} minHeight={200}>
              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 10,
                  left: 20,
                  bottom: 0,
                }}>
                {/* <CartesianGrid stroke="#E8E8EF" vertical={false} /> */}
                {GraphGradient(title)}

                <XAxis
                  axisLine={false}
                  tickLine={false}
                  ticks={getXTicks}
                  dataKey="date_key"
                  tickFormatter={renderCustomAxisTickXaxis}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  dataKey="amount"
                  ticks={getYTicks}
                  tickFormatter={renderCustomAxisTickYaxis}
                />
                <Tooltip labelFormatter={renderCustomToolTip} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  tickFormatter={renderCustomAxisTickYaxis}
                  stroke={`url(${StrokeID(title)})`}
                  style={{
                    strokeLinecap: 'round',
                  }}
                  dot={false}
                  activeDot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </GraphBox>
        )}
      </GraphCol>
    </>
  );
}

export default GraphColumn;
