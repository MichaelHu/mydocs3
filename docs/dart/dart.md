# dart

> todo

## Features

* 开源免费编程语言，Google出品
* 相关：Flutter

## Resources

* site: <https://www.dartlang.org>
* [ 190126 ] 使用Flutter一年后，这是我得到的经验 <https://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA==&mid=2651013049&idx=2&sn=02d3be0c89406ba89d88ec6d4c093209> 在这篇文章中，作者分享了使用 Flutter 的经验，以及在整个过程中发现的所有 Flutter 的优缺点


## Simple Example

    import 'dart:math' show Random;

    main() async {
      print('Compute π using the Monte Carlo method.');
      await for (var estimate in computePi().take(500)) {
        print('π ≅ $estimate');
      }
    }

    /// Generates a stream of increasingly accurate estimates of π.
    Stream<double> computePi({int batch = 100000}) async* {
      var total = 0;
      var count = 0;
      while (true) {
        var points = generateRandom().take(batch);
        var inside = points.where((p) => p.isInsideUnitCircle);
        total += batch;
        count += inside.length;
        var ratio = count / total;
        // Area of a circle is A = π⋅r², therefore π = A/r².
        // So, when given random points with x ∈ <0,1>,
        // y ∈ <0,1>, the ratio of those inside a unit circle
        // should approach π / 4. Therefore, the value of π
        // should be:
        yield ratio * 4;
      }
    }

    Iterable<Point> generateRandom([int seed]) sync* {
      final random = Random(seed);
      while (true) {
        yield Point(random.nextDouble(), random.nextDouble());
      }
    }

    class Point {
      final double x, y;
      const Point(this.x, this.y);
      bool get isInsideUnitCircle => x * x + y * y <= 1;
    }

