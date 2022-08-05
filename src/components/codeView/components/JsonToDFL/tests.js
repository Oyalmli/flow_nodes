/*
#include "dfl/dfl.hpp"

using namespace dfl; 
int main() {
	gen::range(0,100,1)
	>>=	pipe::partition([](auto a){ return (a%2) == 0; },
        sink::printf("Even: %d\n"), 
        pipe::transform([](auto a){ return a + 10; })
        >>= pipe::partition([](auto a){ return (a%2) == 0; },
            sink::printf("Odd + 10: %d\n"), 
            sink::printf("%d\n"))
    );
}
*/
