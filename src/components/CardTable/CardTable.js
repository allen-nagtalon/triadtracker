import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, Checkbox, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import axiosInstance from '../../axios'

function createData (id, name, icon, stars, top, right, bottom, left) {
  return {
    id,
    name,
    icon,
    stars,
    top,
    right,
    bottom,
    left
  }
}

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'id',
    centered: true,
    disablePadding: true,
    label: '#'
  },
  {
    id: 'name',
    centered: false,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'stars',
    centered: false,
    disablePadding: false,
    label: 'Stars'
  },
  {
    id: 'stats',
    centered: true,
    disablePadding: false,
    label: 'Stats'
  }
]

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } =
    props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.centered ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id
                ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                  )
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {
          window.localStorage.getItem('access_token')
            ? <TableCell padding='checkbox' />
            : null
        }
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const StatsGrid = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ justifyContent: 'center' }}>
        <Typography>{props.top}</Typography>
      </Box>
      <Box sx={{
        justifyContent: 'space-around',
        display: 'flex',
        flexDirection: 'row'
      }}
      >
        <Typography>{props.top}</Typography>
        <Typography>{props.bottom}</Typography>
      </Box>
      <Box sx={{ justifyContent: 'center' }}>
        <Typography>{props.bottom}</Typography>
      </Box>
    </Box>
  )
}

const OwnedCheckbox = (props) => {
  const handleChecked = (event) => {
    props.handleChecked(event.target.checked, props.card)
  }

  return (
    <Checkbox
      color='primary'
      checked={props.checked}
      onChange={handleChecked}
    />
  )
}

const CardTable = (props) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [ownedState, setOwnedState] = useState([])

  useEffect(() => {
    if (window.localStorage.getItem('access_token')) {
      axiosInstance.get('owned-cards/')
        .then(response => setOwnedState(response.data.map(el => el.owned)))
    }
  }, [])

  const handleChecked = (value, card) => {
    const temp = [...ownedState]
    temp[card] = value
    setOwnedState(temp)

    axiosInstance.post('owned-cards/update/', {
      card: card,
      value: value
    })
  }

  const rows = props.cards.map((card) =>
    createData(
      card.id,
      card.name,
      card.icon,
      card.stars,
      card.topValue,
      card.rightValue,
      card.bottomValue,
      card.leftValue)
  )

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const renderStars = (stars) => {
    switch (stars) {
      case 1:
        return '★'
      case 2:
        return '★★'
      case 3:
        return '★★★'
      case 4:
        return '★★★★'
      case 5:
        return '★★★★★'
      default:
        return 'Error'
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', my: 3 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size='small'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                        align='center'
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align='left'>
                        <img src={row.icon} alt='cardicon' style={{ height: '60px', padding: 5, marginRight: '7px' }} align='center' />{row.name}
                      </TableCell>
                      <TableCell align='left'>{renderStars(row.stars)}</TableCell>
                      <TableCell align='center'>
                        <StatsGrid
                          top={row.top}
                          left={row.left}
                          right={row.right}
                          bottom={row.bottom}
                        />
                      </TableCell>

                      {window.localStorage.getItem('access_token')
                        ? <>
                          <TableCell padding='checkbox'>
                            <OwnedCheckbox
                              card={row.id}
                              checked={ownedState[row.id]}
                              handleChecked={handleChecked}
                            />
                          </TableCell>
                        </>
                        : null}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default CardTable
