import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Container, CheckinDate, CheckinNumber } from './styles';

export default function Checkins({ checkin, index, totalRows }) {
  const dateFormatted = useMemo(() => {
    return formatRelative(parseISO(checkin.createdAt), new Date(), {
      locale: pt,
    });
  }, [checkin.createdAt]);

  const chekinNumber = useMemo(() => {
    return totalRows - index;
  }, [index, totalRows]);

  return (
    <Container>
      <CheckinNumber>{`Check-in #${chekinNumber}`}</CheckinNumber>
      <CheckinDate>{dateFormatted}</CheckinDate>
    </Container>
  );
}
Checkins.propTypes = {
  checkin: PropTypes.oneOfType([PropTypes.object]).isRequired,
  index: PropTypes.number.isRequired,
  totalRows: PropTypes.number.isRequired,
};
