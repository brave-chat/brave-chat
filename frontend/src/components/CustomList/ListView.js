import React from "react";

import PropTypes from "prop-types";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import { Box } from "@mui/material";

const getEmptyContainer = (ListEmptyComponent) => {
  if (ListEmptyComponent)
    return React.isValidElement(ListEmptyComponent) ? (
      ListEmptyComponent
    ) : (
      <ListEmptyComponent />
    );
  return null;
};

const getFooterContainer = (ListFooterComponent) => {
  if (ListFooterComponent)
    return React.isValidElement(ListFooterComponent) ? (
      ListFooterComponent
    ) : (
      <ListFooterComponent />
    );
  return null;
};

const ListView = ({
  renderRow,
  onEndReached,
  data,
  ListFooterComponent,
  ListEmptyComponent,
  ...rest
}) => {
  useBottomScrollListener(onEndReached, 200);

  return (
    <Box {...rest}>
      {data.length > 0
        ? data.map((item, index) => renderRow(item, index))
        : getEmptyContainer(ListEmptyComponent)}
      {getFooterContainer(ListFooterComponent)}
    </Box>
  );
};

export default ListView;

ListView.propTypes = {
  ListEmptyComponent: PropTypes.element,
  ListFooterComponent: PropTypes.element,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
  renderRow: PropTypes.func,
};

ListView.defaultProps = {
  data: [],
  onEndReached: () => {},
};
