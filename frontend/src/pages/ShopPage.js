import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { products as PRODUCT_CATALOG, BRIDAL_LOOKS as STYLES, CATEGORIES } from '../data/products';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const PageContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: ${props => props.theme.colors.white};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const ProductCount = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 1rem;
  margin: 0;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Sidebar = styled.aside`
  @media (max-width: 1024px) {
    order: 2;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FilterGroupTitle = styled.h4`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.dark};
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${props => props.theme.colors.primary};
`;

const ProductGrid = styled.div`
  @media (max-width: 1024px) {
    order: 1;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SortLabel = styled.label`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 4px;
  background: ${props => props.theme.colors.white};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.dark};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const ProductCard = styled.div`
  position: relative;
  background: ${props => props.theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 350px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: top;
  background-color: ${props => props.theme.colors.lightGray};
  position: relative;
`;

const ProductBadge = styled.div`
    position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.white};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ProductStyle = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
`;

const OriginalPrice = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
  text-decoration: line-through;
`;

const SalePrice = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const SizeOption = styled.button`
  padding: 0.3rem 0.6rem;
  border: 1px solid ${props => props.theme.colors.lightGray};
  background: ${props => props.theme.colors.white};
  border-radius: 4px;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.lightGray};
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.dark};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.lightGray};
  }
`;

const ShopPage = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: [],
    bridalLook: [],
    price: [],
    size: []
  });
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [addingId, setAddingId] = useState(null);
  const productsPerPage = 12;

  // Handle URL parameters for initial filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const bridalLookParam = searchParams.get('bridalLook');
    const styleParam = searchParams.get('style'); // Also handle 'style' parameter
    const featuredParam = searchParams.get('featured');
    
    const newFilters = {
      category: [],
      bridalLook: [],
      price: [],
      size: []
    };

    // Handle featured products (Our Favourites)
    if (featuredParam === 'true') {
      // Set sort to best-selling to show our favorites
      setSortBy('best-selling');
      // Don't apply any category filters - show all products
    }
    // Handle separates category - filter by style="separates"
    else if (categoryParam === 'separates') {
      // For separates, we want to show all products with style="separates"
      // This includes tops, skirts, trousers, jackets, jumpsuits
      const separatesCategories = ['tops', 'skirts', 'trousers', 'jackets', 'jumpsuits'];
      newFilters.category = separatesCategories;
    } else if (categoryParam === 'accessories') {
      // For accessories, show veils, headpieces, jewelry, shoes
      const accessoryCategories = ['veils', 'headpieces', 'jewelry', 'shoes'];
      newFilters.category = accessoryCategories;
    } else if (categoryParam) {
      // For other categories (gowns, etc.)
      newFilters.category = [categoryParam];
    }

    if (bridalLookParam) {
      newFilters.bridalLook = [bridalLookParam];
    }

    if (styleParam) {
      newFilters.bridalLook = [styleParam];
    }

    setFilters(newFilters);
  }, [searchParams]);

  // Expanded product data with complete collections and bridal look classifications
  const products = useMemo(() => [
    // EXISTING PRODUCTS (1-20) with bridal look assignments
    {
      id: 1,
      name: "Rosalind Topper",
      style: "separates",
      category: "tops",
      bridalLook: "classic",
      price: 995,
      originalPrice: null,
      image: "images/shopby/Rosalind_Topper.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false,
      dateAdded: "2024-01-15"
    },
    {
      id: 2,
      name: "Anya Topper",
      style: "separates",
      category: "tops",
      bridalLook: "modern",
      price: 995,
      originalPrice: null,
      image: "images/shopby/AnyaTopper.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 3,
      name: "Monique Top",
      style: "separates",
      category: "tops",
      bridalLook: "romantic",
      price: 895,
      originalPrice: null,
      image: "images/shopby/MoniqueTop.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 4,
      name: "Zuri Skirt",
      style: "separates",
      category: "skirts",
      bridalLook: "classic",
      price: 995,
      originalPrice: null,
      image: "/images/shopby/zuriskirt.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 5,
      name: "Vicki Skirt",
      style: "separates",
      category: "skirts",
      bridalLook: "glamour",
      price: 995,
      originalPrice: null,
      image: "images/shopby/vickiskirt.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 6,
      name: "Alexis Trousers",
      style: "separates",
      category: "trousers",
      bridalLook: "modern",
      price: 545,
      originalPrice: null,
      image: "images/shopby/AlexisTrou.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 7,
      name: "Jewel Jacket",
      style: "separates",
      category: "jackets",
      bridalLook: "glamour",
      price: 825,
      originalPrice: null,
      image: "images/shopby/JewelJacket.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 8,
      name: "Ophelia Bodice",
      style: "separates",
      category: "tops",
      bridalLook: "romantic",
      price: 825,
      originalPrice: null,
      image: "images/shopby/OpheliaBodice.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 9,
      name: "Stardust Topper",
      style: "separates",
      category: "tops",
      bridalLook: "glamour",
      price: 825,
      originalPrice: null,
      image: "images/shopby/StardustTopper.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 10,
      name: "Darla Bodice Satin",
      style: "separates",
      category: "tops",
      bridalLook: "classic",
      price: 395,
      originalPrice: null,
      image: "images/shopby/DarlaBodiceSatin.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 11,
      name: "Zaina Blazer",
      style: "separates",
      category: "jackets",
      bridalLook: "courthouse",
      price: 695,
      originalPrice: null,
      image: "images/shopby/ZainaBlazer.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 12,
      name: "Aurelia Trousers",
      style: "separates",
      category: "trousers",
      bridalLook: "modern",
      price: 895,
      originalPrice: null,
      image: "images/shopby/AureliaTrousers.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 13,
      name: "Liz Skirt",
      style: "separates",
      category: "skirts",
      bridalLook: "classic",
      price: 1100,
      originalPrice: null,
      image: "images/shopby/lizskirt.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 14,
      name: "Novo Jumpsuit",
      style: "separates",
      category: "jumpsuits",
      bridalLook: "modern",
      price: 895,
      originalPrice: null,
      image: "images/shopby/NovoJumpsuit.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 15,
      name: "Amy Skirt",
      style: "separates",
      category: "skirts",
      bridalLook: "destination",
      price: 298,
      originalPrice: 595,
      image: "images/shopby/AmySkirt.jpg",
      sizes: ["XS", "S", "M", "L", "XL"],
      onSale: true
    },
    {
      id: 16,
      name: "Talli Skirt",
      style: "separates",
      category: "skirts",
      bridalLook: "boho",
      price: 595,
      originalPrice: null,
      image: "images/shopby/talliSkirt.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 17,
      name: "Ryo Jumpsuit Crepe",
      style: "separates",
      category: "jumpsuits",
      bridalLook: "courthouse",
      price: 795,
      originalPrice: null,
      image: "images/shopby/ryoJump.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 18,
      name: "Izzy Trousers",
      style: "separates",
      category: "trousers",
      bridalLook: "destination",
      price: 545,
      originalPrice: null,
      image: "images/shopby/IzzyTrousers.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 19,
      name: "Zia Bandeau Crepe",
      style: "separates",
      category: "tops",
      bridalLook: "destination",
      price: 395,
      originalPrice: null,
      image: "images/shopby/ZiaBandeauCrepe.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 20,
      name: "Olive Gown",
      style: "gowns",
      category: "gowns",
      bridalLook: "classic",
      price: 1250,
      originalPrice: null,
      image: "images/shopby/OliveGown.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },

    // NEW GOWNS (21-24) - Adding 4 more to reach 5 total
    {
      id: 21,
      name: "Seraphina Gown",
      style: "gowns",
      category: "gowns",
      bridalLook: "romantic",
      price: 1450,
      originalPrice: null,
      image: "images/shopby/seraphina.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 22,
      name: "Isabella Ball Gown",
      style: "gowns",
      category: "gowns",
      bridalLook: "glamour",
      price: 1650,
      originalPrice: null,
      image: "images/shopby/isabella.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 23,
      name: "Luna A-Line Gown",
      style: "gowns",
      category: "gowns",
      bridalLook: "classic",
      price: 1350,
      originalPrice: null,
      image: "images/shopby/luna.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 24,
      name: "Celeste Mermaid Gown",
      style: "gowns",
      category: "gowns",
      bridalLook: "glamour",
      price: 1550,
      originalPrice: null,
      image: "images/shopby/celestine.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },

    // NEW JUMPSUITS (25-27) - Adding 3 more to reach 5 total
    {
      id: 25,
      name: "Phoenix Wide Leg Jumpsuit",
      style: "separates",
      category: "jumpsuits",
      bridalLook: "modern",
      price: 945,
      originalPrice: null,
      image: "images/shopby/pheonix.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 26,
      name: "Aria Culotte Jumpsuit",
      style: "separates",
      category: "jumpsuits",
      bridalLook: "boho",
      price: 850,
      originalPrice: null,
      image: "images/shopby/Aria_Jumpsuit.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 27,
      name: "Sage Silk Jumpsuit",
      style: "separates",
      category: "jumpsuits",
      bridalLook: "reception",
      price: 1050,
      originalPrice: null,
      image: "images/shopby/sagesilk.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },

    // NEW SKIRTS (28) - Adding 1 more to reach 5 total
    {
      id: 28,
      name: "Penelope Circle Skirt",
      style: "separates",
      category: "skirts",
      bridalLook: "romantic",
      price: 750,
      originalPrice: null,
      image: "images/shopby/phenolepe.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },

    // NEW TROUSERS (29-30) - Adding 2 more to reach 5 total
    {
      id: 29,
      name: "Nova Wide Leg Trousers",
      style: "separates",
      category: "trousers",
      bridalLook: "boho",
      price: 645,
      originalPrice: null,
      image: "images/shopby/NovoJumpsuit.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 30,
      name: "Margot Straight Trousers",
      style: "separates",
      category: "trousers",
      bridalLook: "courthouse",
      price: 595,
      originalPrice: null,
      image: "images/shopby/margot.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },

    // NEW JACKETS (31-33) - Adding 3 more to reach 5 total
    {
      id: 31,
      name: "Dahlia Cropped Jacket",
      style: "separates",
      category: "jackets",
      bridalLook: "modern",
      price: 750,
      originalPrice: null,
      image: "images/shopby/Dahila.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 32,
      name: "Willow Cape Jacket",
      style: "separates",
      category: "jackets",
      bridalLook: "boho",
      price: 895,
      originalPrice: null,
      image: "images/shopby/willow.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 33,
      name: "Rose Long Sleeve Jacket",
      style: "separates",
      category: "jackets",
      bridalLook: "romantic",
      price: 925,
      originalPrice: null,
      image: "images/shopby/rose.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },

    // NEW BRIDAL ACCESSORIES (34-50) - Adding comprehensive accessories collection
    {
      id: 34,
      name: "Cathedral Length Veil",
      style: "accessories",
      category: "veils",
      bridalLook: "classic",
      price: 450,
      originalPrice: null,
      image: "images/shopby/cathed.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 35,
      name: "Chapel Length Veil with Beading",
      style: "accessories",
      category: "veils",
      bridalLook: "glamour",
      price: 550,
      originalPrice: null,
      image: "images/shopby/chapel.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 36,
      name: "Fingertip Lace Veil",
      style: "accessories",
      category: "veils",
      bridalLook: "romantic",
      price: 350,
      originalPrice: null,
      image: "images/shopby/fingertip.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 37,
      name: "Simple Elbow Veil",
      style: "accessories",
      category: "veils",
      bridalLook: "courthouse",
      price: 250,
      originalPrice: null,
      image: "images/shopby/elbow.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 38,
      name: "Bohemian Floral Veil",
      style: "accessories",
      category: "veils",
      bridalLook: "boho",
      price: 395,
      originalPrice: null,
      image: "images/shopby/floral.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 39,
      name: "Pearl Crystal Headpiece",
      style: "accessories",
      category: "headpieces",
      bridalLook: "glamour",
      price: 295,
      originalPrice: null,
      image: "images/shopby/perlcrys.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 40,
      name: "Vintage Inspired Hair Comb",
      style: "accessories",
      category: "headpieces",
      bridalLook: "romantic",
      price: 185,
      originalPrice: null,
      image: "images/shopby/vintage.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 41,
      name: "Minimalist Hair Pin Set",
      style: "accessories",
      category: "headpieces",
      bridalLook: "modern",
      price: 125,
      originalPrice: null,
      image: "images/shopby/minimalist.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 42,
      name: "Wildflower Hair Vine",
      style: "accessories",
      category: "headpieces",
      bridalLook: "boho",
      price: 165,
      originalPrice: null,
      image: "images/shopby/wildflower.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 43,
      name: "Classic Tiara",
      style: "accessories",
      category: "headpieces",
      bridalLook: "classic",
      price: 375,
      originalPrice: null,
      image: "images/shopby/classicTiara.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 44,
      name: "Delicate Pearl Earrings",
      style: "accessories",
      category: "jewelry",
      bridalLook: "classic",
      price: 125,
      originalPrice: null,
      image: "images/shopby/delicate.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 45,
      name: "Statement Crystal Necklace",
      style: "accessories",
      category: "jewelry",
      bridalLook: "glamour",
      price: 225,
      originalPrice: null,
      image: "images/shopby/statementcrys.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 46,
      name: "Gold Chain Bracelet",
      style: "accessories",
      category: "jewelry",
      bridalLook: "modern",
      price: 95,
      originalPrice: null,
      image: "images/shopby/gold.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 47,
      name: "Turquoise Drop Earrings",
      style: "accessories",
      category: "jewelry",
      bridalLook: "boho",
      price: 85,
      originalPrice: null,
      image: "images/shopby/turquoise.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 48,
      name: "Vintage Pearl Bracelet",
      style: "accessories",
      category: "jewelry",
      bridalLook: "romantic",
      price: 145,
      originalPrice: null,
      image: "images/shopby/pearlbrace.jpg",
      sizes: ["One Size"],
      onSale: false
    },
    {
      id: 49,
      name: "Satin Bridal Shoes",
      style: "accessories",
      category: "shoes",
      bridalLook: "classic",
      price: 295,
      originalPrice: null,
      image: "images/shopby/satinshoes.jpg",
      sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
      onSale: false
    },
    {
      id: 50,
      name: "Block Heel Wedding Shoes",
      style: "accessories",
      category: "shoes",
      bridalLook: "modern",
      price: 325,
      originalPrice: null,
      image: "images/shopby/blockheel.jpg",
      sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
      onSale: false
    },
    {
      id: 51,
      name: "Strappy Heel Sandals",
      style: "accessories",
      category: "shoes",
      bridalLook: "glamour",
      price: 375,
      originalPrice: null,
      image: "images/shopby/strappy.jpg",
      sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
      onSale: false
    },
    {
      id: 52,
      name: "Boho Embroidered Flats",
      style: "accessories",
      category: "shoes",
      bridalLook: "boho",
      price: 245,
      originalPrice: null,
      image: "images/shopby/bohoemb.jpg",
      sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
      onSale: false
    },
    {
      id: 53,
      name: "Romantic Lace Ballet Flats",
      style: "accessories",
      category: "shoes",
      bridalLook: "romantic",
      price: 195,
      originalPrice: null,
      image: "images/shopby/romanticlace.jpg",
      sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
      onSale: false
    },

    // ADDITIONAL PRODUCTS FOR BRIDAL LOOKS (54-60)
    {
      id: 54,
      name: "Office Chic Pencil Skirt",
      style: "separates",
      category: "skirts",
      bridalLook: "courthouse",
      price: 425,
      originalPrice: null,
      image: "/images/Bride_seperates.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 55,
      name: "Tropical Maxi Dress",
      style: "gowns",
      category: "gowns",
      bridalLook: "destination",
      price: 895,
      originalPrice: null,
      image: "images/shopby/tropical.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 56,
      name: "Beachy Wrap Top",
      style: "separates",
      category: "tops",
      bridalLook: "destination",
      price: 325,
      originalPrice: null,
      image: "images/shopby/BeachyWrapTop.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 57,
      name: "Sparkle Mini Dress",
      style: "gowns",
      category: "gowns",
      bridalLook: "reception",
      price: 750,
      originalPrice: null,
      image: "images/shopby/sparkle.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 58,
      name: "Party Sequin Top",
      style: "separates",
      category: "tops",
      bridalLook: "reception",
      price: 495,
      originalPrice: null,
      image: "images/shopby/PartySequinTop.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 59,
      name: "Dancing Skirt",
      style: "separates",
      category: "skirts",
      bridalLook: "reception",
      price: 385,
      originalPrice: null,
      image: "images/shopby/dancing.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 60,
      name: "After-Party Jumpsuit",
      style: "separates",
      category: "jumpsuits",
      bridalLook: "reception",
      price: 625,
      originalPrice: null,
      image: "/images/jumpsuits.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    },
    {
      id: 61,
      name: "Royal Ball gown",
      style: "gowns",
      category: "gowns",
      bridalLook: "reception",
      price: 2000,
      originalPrice: null,
      image: "/images/gowns.jpg",
      sizes: ["US0", "US2", "US4", "US6", "US8", "US10", "US12", "US14"],
      onSale: false
    }
  ], []);

  const categories = [
    { value: 'tops', label: 'Tops' },
    { value: 'skirts', label: 'Skirts' },
    { value: 'trousers', label: 'Trousers' },
    { value: 'jumpsuits', label: 'Jumpsuits' },
    { value: 'jackets', label: 'Jackets & Blouses' },
    { value: 'gowns', label: 'Full Length Gowns' },
    { value: 'veils', label: 'Veils' },
    { value: 'headpieces', label: 'Headpieces' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'shoes', label: 'Wedding Shoes' }
  ];

  const styles = [
    { value: 'classic', label: 'Classic Bride' },
    { value: 'modern', label: 'Modern Bride' },
    { value: 'romantic', label: 'Romantic Bride' },
    { value: 'boho', label: 'Boho Bride' },
    { value: 'destination', label: 'Destination Bride' },
    { value: 'courthouse', label: 'Registry Office Bride' },
    { value: 'glamour', label: 'Glamour Bride' },
    { value: 'reception', label: 'Reception Bride' }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = filters.category.length === 0 || filters.category.includes(product.category);
      const bridalLookMatch = filters.bridalLook.length === 0 || filters.bridalLook.includes(product.bridalLook);
      
      return categoryMatch && bridalLookMatch;
    });
  }, [filters, products]);

  const sortedProducts = useMemo(() => {
    // Add dateAdded field to products that don't have it (for backwards compatibility)
    const productsWithDates = filteredProducts.map(product => {
      if (!product.dateAdded) {
        // Assign dates based on product ID to simulate different add dates
        const baseDate = new Date('2024-01-01');
        const daysToAdd = (product.id - 1) * 7; // Space products 7 days apart
        const productDate = new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
        return { ...product, dateAdded: productDate.toISOString().split('T')[0] };
      }
      return product;
    });
    
    const sorted = [...productsWithDates];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-new':
        return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      case 'date-old':
        return sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      case 'best-selling':
        // Simulate best selling by sorting by reverse ID (newer products tend to sell better)
        return sorted.sort((a, b) => b.id - a.id);
      default:
        // Featured sorting - mix of new and popular items
        return sorted.sort((a, b) => {
          const aScore = (50 - a.id) + (a.onSale ? 20 : 0) + (a.price > 1000 ? 10 : 0);
          const bScore = (50 - b.id) + (b.onSale ? 20 : 0) + (b.price > 1000 ? 10 : 0);
          return bScore - aScore;
        });
    }
  }, [filteredProducts, sortBy]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return sortedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Generate dynamic page title based on filters
  const getPageTitle = () => {
    const categoryParam = searchParams.get('category');
    const styleParam = searchParams.get('style');
    const featuredParam = searchParams.get('featured');
    
    if (featuredParam === 'true') {
      return 'Our Favourites';
    } else if (categoryParam === 'separates') {
      return 'Bridal Separates';
    } else if (categoryParam === 'accessories') {
      return 'Bridal Accessories';
    } else if (categoryParam === 'gowns') {
      return 'Wedding Gowns';
    } else if (categoryParam === 'jumpsuits') {
      return 'Bridal Jumpsuits';
    } else if (styleParam === 'classic') {
      return 'Classic Bride Collection';
    } else if (styleParam === 'modern') {
      return 'Modern Bride Collection';
    } else if (styleParam === 'romantic') {
      return 'Romantic Bride Collection';
    } else if (styleParam === 'boho') {
      return 'Boho Bride Collection';
    } else if (styleParam === 'glamour') {
      return 'Glamour Bride Collection';
    } else if (styleParam === 'destination') {
      return 'Destination Bride Collection';
    } else if (styleParam === 'courthouse') {
      return 'Courthouse Bride Collection';
    } else if (styleParam === 'reception') {
      return 'Reception Bride Collection';
    }
    return 'Become a CarolineBride';
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      alert('Please sign in to add items to your cart.');
      return;
    }

    try {
      setAddingId(product.id);
      const cartResponse = await axios.get(`${API_BASE_URL}/cart`);
      const existingItems = Array.isArray(cartResponse.data)
        ? cartResponse.data
        : cartResponse.data.items || [];

      const updatedItems = [
        ...existingItems,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: product.sizes?.[0] || '',
          quantity: 1
        }
      ];

      await axios.post(`${API_BASE_URL}/cart`, { items: updatedItems });
    } catch (error) {
      console.error('Error adding to cart', error);
      alert('Unable to add this item to your cart right now.');
    } finally {
      setAddingId(null);
    }
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <PageTitle>{getPageTitle()}</PageTitle>
          <ProductCount>{sortedProducts.length} products</ProductCount>
        </Header>

        <MainContent>
          <Sidebar>
            <FilterSection>
              <FilterTitle>
                <FiFilter />
                Filter
              </FilterTitle>
              
              <FilterGroup>
                <FilterGroupTitle>Categories</FilterGroupTitle>
                <FilterOptions>
                  {categories.map(category => (
                    <FilterOption key={category.value}>
                      <Checkbox
                        type="checkbox"
                        checked={filters.category.includes(category.value)}
                        onChange={() => handleFilterChange('category', category.value)}
                      />
                      {category.label}
                    </FilterOption>
                  ))}
                </FilterOptions>
              </FilterGroup>

              <FilterGroup>
                <FilterGroupTitle>Bridal Looks</FilterGroupTitle>
                <FilterOptions>
                  {styles.map(style => (
                    <FilterOption key={style.value}>
                      <Checkbox
                        type="checkbox"
                        checked={filters.bridalLook.includes(style.value)}
                        onChange={() => handleFilterChange('bridalLook', style.value)}
                      />
                      {style.label}
                    </FilterOption>
                  ))}
                </FilterOptions>
              </FilterGroup>
            </FilterSection>
          </Sidebar>

          <ProductGrid>
            <Toolbar>
              <div></div>
              <SortContainer>
                <SortLabel>Sort</SortLabel>
                <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="best-selling">Best selling</option>
                  <option value="name-asc">Alphabetically, A-Z</option>
                  <option value="name-desc">Alphabetically, Z-A</option>
                  <option value="price-low">Price, low to high</option>
                  <option value="price-high">Price, high to low</option>
                  <option value="date-new">Date, new to old</option>
                  <option value="date-old">Date, old to new</option>
                </SortSelect>
              </SortContainer>
            </Toolbar>

            <GridContainer>
              {paginatedProducts.map(product => (
                <ProductCard key={product.id}>
                  <ProductImage image={product.image}>
                    {product.onSale && <ProductBadge>Sale</ProductBadge>}
                    <WishlistButton>
                      <FiHeart />
                    </WishlistButton>
                  </ProductImage>
                  
                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductStyle>{product.style}</ProductStyle>
                    
                    <ProductPrice>
                      {product.onSale ? (
                        <>
                          <SalePrice>{formatPrice(product.price)}</SalePrice>
                          <OriginalPrice>{formatPrice(product.originalPrice)}</OriginalPrice>
                        </>
                      ) : (
                        <CurrentPrice>{formatPrice(product.price)}</CurrentPrice>
                      )}
                    </ProductPrice>
                    
                    <SizeOptions>
                      {product.sizes.slice(0, 4).map(size => (
                        <SizeOption key={size}>{size}</SizeOption>
                      ))}
                      {product.sizes.length > 4 && (
                        <SizeOption>+{product.sizes.length - 4}</SizeOption>
                      )}
                    </SizeOptions>
                    
                    <AddToCartButton onClick={() => handleAddToCart(product)}>
                      <FiShoppingBag />
                      {addingId === product.id ? 'Adding...' : 'Add to Cart'}
                    </AddToCartButton>
                  </ProductInfo>
                </ProductCard>
              ))}
            </GridContainer>

            {totalPages > 1 && (
              <Pagination>
                <PageButton
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </PageButton>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PageButton
                    key={page}
                    active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PageButton>
                ))}
                
                <PageButton
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </PageButton>
              </Pagination>
            )}
          </ProductGrid>
        </MainContent>
      </Container>
    </PageContainer>
  );
};

export default ShopPage;