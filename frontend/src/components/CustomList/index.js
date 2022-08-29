import React from "react";

import PropTypes from "prop-types";

import ListFooter from "./ListFooter";
import ListView from "./ListView";

const CustomList = ({ footerProps, ...props }) => {
  return (
    <ListView
      {...props}
      ListFooterComponent={
        footerProps && (
          <ListFooter
            loading={footerProps.loading}
            footerText={footerProps.footerText}
          />
        )
      }
    />
  );
};

export default CustomList;

CustomList.propTypes = {
  ListEmptyComponent: PropTypes.element,
  ListFooterComponent: PropTypes.element,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
  footerProps: PropTypes.object,
};
CustomList.defaultProps = {
  data: [],
};
