# Website Project Guide: Unicorn Commander

## Core Structure

### 1. Brand Elements
- **Name**: Unicorn Commander
- **Tagline**: "Take Command. Automate. Dominate."
- **Value Proposition**: AI command center that multiplies human capability
- **Color Scheme**: 
  - Primary: Purple (#7c3aed)
  - Secondary: Blue (#2563eb)
  - Background: Dark (#111827)
  - Accents: Various purple shades for depth

### 2. Key Sections

#### Header
```jsx
- Logo/Brand name
- Main tagline
- Quick value proposition (3 key benefits)
- Social proof banner
```

#### Product Offerings
1. **Founders Edition**
   - Limited quantity (500 units)
   - Premium pricing ($15,000)
   - Deposit structure ($1,000 initial)
   - Shipping date (Valentine's Day 2024)
   - Exclusive benefits

2. **Hosted Solution**
   - Waitlist system
   - Beta access
   - Cloud-based features
   - Subscription model (future)

### 3. Technical Components

#### Frontend
- React + Vite
- TailwindCSS
- Framer Motion (animations)
- React Icons
- React Hot Toast (notifications)

#### Backend Integration Points
- Stripe Payments
- SQLite Database
- Email Collection
- Analytics (optional)

#### Deployment
- Docker containerization
- Nginx configuration
- Health monitoring
- Automated deployment

## Content Strategy

### 1. Value Propositions

#### Primary Benefits
- Ownership vs Subscription
- AI Multiplication of Capability
- Future-Proof Investment

#### Feature Categories
1. **Automation**
   ```
   Save 100+ hours monthly
   $10/hour tasks → $1000/hour focus
   ```

2. **Content Creation**
   ```
   Weeks of content in minutes
   24/7 AI content factory
   ```

3. **Analysis**
   ```
   Instant data insights
   Team of analysts in one tool
   ```

4. **Scaling**
   ```
   10x output without 10x staff
   Growth without proportional cost
   ```

### 2. Psychological Triggers

#### Scarcity
- Limited units (500)
- Founders Edition exclusivity
- Time-limited offer

#### Urgency
- Countdown timer
- Price increase warning
- Limited availability

#### Social Proof
- Units claimed counter
- Recent purchases ticker
- User testimonials (future)

#### Value Justification
- ROI calculator
- Cost comparison
- Time savings metrics

## Technical Implementation

### 1. Core Components

```jsx
- CountdownTimer
- ROICalculator
- PreorderModal
- WaitlistForm
- FeatureCard
- SocialProofBanner
- PricingDisplay
```

### 2. State Management
```javascript
const [remainingUnits, setRemainingUnits] = useState(497);
const [showPreorderModal, setShowPreorderModal] = useState(false);
```

### 3. API Integration Points
```javascript
- /api/waitlist
- /api/preorders/remaining
- /api/stripe-webhook
```

### 4. Database Schema
```sql
-- Waitlist Table
CREATE TABLE waitlist (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  betaTester BOOLEAN,
  createdAt DATETIME
);

-- Preorders Table
CREATE TABLE preorders (
  id INTEGER PRIMARY KEY,
  stripeSessionId TEXT,
  email TEXT,
  amount INTEGER,
  status TEXT,
  createdAt DATETIME
);
```

## Marketing Elements

### 1. Call-to-Actions
- Pre-order Now ($1,000 deposit)
- Join Waitlist (hosted version)
- Calculate ROI
- Learn More

### 2. Trust Builders
- Iron-Clad Guarantee
- Lifetime Support
- Free Updates
- Money-Back Promise

### 3. Feature Presentation
- Visual icons
- Benefit-focused descriptions
- Technical specifications
- Use case examples

## Deployment Configuration

### 1. Docker Setup
```dockerfile
# Multi-stage build
- Node.js build environment
- Nginx production server
- Security configurations
- Performance optimizations
```

### 2. Nginx Configuration
```nginx
- SPA routing
- Caching rules
- Security headers
- Static file handling
```

### 3. Monitoring
- Health checks
- Error logging
- Performance metrics
- User analytics

## Customization Points

### 1. Brand Elements
```javascript
const brandConfig = {
  name: "Your Brand",
  tagline: "Your Tagline",
  colors: {
    primary: "#YOUR_COLOR",
    secondary: "#YOUR_COLOR",
    accent: "#YOUR_COLOR"
  }
};
```

### 2. Product Configuration
```javascript
const productConfig = {
  totalUnits: 500,
  basePrice: 15000,
  depositAmount: 1000,
  launchDate: "2024-02-14",
  features: [
    // Your features
  ]
};
```

### 3. Integration Keys
```javascript
const integrationConfig = {
  stripePublicKey: "YOUR_KEY",
  analyticsKey: "YOUR_KEY",
  apiEndpoint: "YOUR_ENDPOINT"
};
```

## Development Workflow

### 1. Setup
```bash
# Initial setup
npm create vite@latest
npm install
npm install tailwindcss postcss autoprefixer
```

### 2. Development
```bash
# Start development server
npm run dev

# Build for production
npm run build
```

### 3. Deployment
```bash
# Deploy with Docker
./deploy.sh
```

## Best Practices

### 1. Performance
- Lazy loading
- Image optimization
- Code splitting
- Caching strategies

### 2. Security
- Input validation
- XSS prevention
- CSRF protection
- Rate limiting

### 3. SEO
- Meta tags
- Semantic HTML
- Performance metrics
- Mobile responsiveness

## Testing Strategy

### 1. Unit Tests
- Component rendering
- State management
- User interactions
- Form validation

### 2. Integration Tests
- API calls
- Payment flow
- Waitlist submission
- Error handling

### 3. E2E Tests
- User journeys
- Cross-browser
- Mobile responsive
- Performance benchmarks

## Maintenance Tasks

### 1. Regular Updates
- Security patches
- Dependency updates
- Feature additions
- Performance optimization

### 2. Monitoring
- Error tracking
- User analytics
- Performance metrics
- Server health

### 3. Backup
- Database backups
- Configuration backups
- User data protection
- Recovery procedures

## Future Enhancements

### 1. Features
- User dashboard
- Analytics integration
- Advanced ROI calculator
- Testimonials section

### 2. Integrations
- CRM systems
- Marketing automation
- Support ticketing
- Social proof APIs

### 3. Content
- Case studies
- Documentation
- Tutorial videos
- Blog/Updates
