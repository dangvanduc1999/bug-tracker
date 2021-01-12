import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FilterBar from '../../components/FilterBar';
import SortBar from '../../components/SortBar';
import { ProjectSortValues } from '../../redux/types';
import { sortProjectsBy } from '../../redux/slices/projectsSlice';

import { Button } from '@material-ui/core';
import { useProjectActionBarStyles } from '../../styles/muiStyles';
import AddIcon from '@material-ui/icons/Add';

const menuItems = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Name (A - Z)' },
  { value: 'z-a', label: 'Name (Z - A)' },
  { value: 'most-bugs', label: 'Most Bugs' },
  { value: 'least-bugs', label: 'Least Bugs' },
  { value: 'most-members', label: 'Most Members' },
  { value: 'least-members', label: 'Least Members' },
];

const ProjectActionBar: React.FC<{
  filterValue: string;
  setFilterValue: (filterValue: string) => void;
}> = ({ filterValue, setFilterValue }) => {
  const classes = useProjectActionBarStyles();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState<ProjectSortValues>('newest');

  const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = e.target.value as ProjectSortValues;
    setSortBy(selectedValue);
    dispatch(sortProjectsBy(selectedValue));
  };

  return (
    <div>
      <div className={classes.inputs}>
        <div className={classes.searchBarWrapper}>
          <FilterBar
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            label="Projects"
          />
        </div>
        <div className={classes.sortBarWrapper}>
          <SortBar
            sortBy={sortBy}
            handleSortChange={handleSortChange}
            menuItems={menuItems}
            label="Projects"
          />
        </div>
      </div>
      <Button
        size="large"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Add Project
      </Button>
    </div>
  );
};

export default ProjectActionBar;
