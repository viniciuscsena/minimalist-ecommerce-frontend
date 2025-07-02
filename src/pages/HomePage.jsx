import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Essential
                  <br />
                  <span className="text-gray-600">Black Tee</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  The perfect foundation for any wardrobe. Premium cotton, 
                  minimalist design, maximum comfort.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-black hover:bg-gray-800">
                  <Link to="/product/black-tshirt">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div>
                  <span className="font-semibold text-gray-900">$29</span>
                  <span className="ml-1">Starting price</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Free</span>
                  <span className="ml-1">Shipping</span>
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {/* Placeholder for product image */}
                  <div className="w-3/4 h-3/4 bg-black rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-white text-lg font-medium">Black Tee</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <span className="text-2xl">✨</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                <span className="text-2xl">🖤</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Black Tee?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Crafted with attention to detail and designed for everyday wear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-2xl">👕</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Premium Cotton</h3>
              <p className="text-gray-600">
                100% organic cotton for ultimate comfort and breathability.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-2xl">✂️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Perfect Fit</h3>
              <p className="text-gray-600">
                Carefully designed cut that flatters every body type.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-2xl">♻️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Sustainable</h3>
              <p className="text-gray-600">
                Ethically sourced materials and responsible manufacturing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to upgrade your wardrobe?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made our black tee 
            their go-to essential.
          </p>
          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
            <Link to="/product/black-tshirt">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

