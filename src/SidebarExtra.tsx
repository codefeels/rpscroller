import { FaSave, FaShoppingCart } from 'react-icons/fa'
import { MdBlock, MdInfo } from 'react-icons/md'
import { Link } from 'react-router-dom'

import MenuItem from './MenuItem'
import SidebarSectionWrapper from './SidebarSectionWrapper'
import { useAppStore } from './store'

export default function SidebarExtra() {
  const store = useAppStore()
  return (
    <SidebarSectionWrapper>
      <Link to="/savedposts">
        <MenuItem>
          <FaSave className="inline" /> Saved posts
        </MenuItem>
      </Link>
      <MenuItem
        onClick={() => {
          store.setCurrentlyOpenDialog('multi')
        }}
      >
        <FaShoppingCart className="inline" /> Make list
      </MenuItem>
      <MenuItem
        onClick={() => {
          store.setCurrentlyOpenDialog('blocked')
        }}
      >
        <MdBlock className="inline" /> Blocked users
      </MenuItem>
      <MenuItem
        onClick={() => {
          store.setCurrentlyOpenDialog('about')
        }}
      >
        <MdInfo className="inline" /> About
      </MenuItem>
    </SidebarSectionWrapper>
  )
}
