var ROTATE_STEP_FORWARD = 8;
var ROTATE_STEP_BACKWARD = -8;
var PULL_TIRE_STEP = 30;
var TIRE_SELECTOR = "div.opona";
var START_DEGREE = 0;
var MID_DEGREE = 90;
var STOP_DEGREE = 180;

angular.module("intervalExample", [])
    .controller("ExampleCtrl", ['$scope', '$interval', '$interpolate', '$element',
        function ($scope, $interval, $interpolate, $element) {
            $scope.stages = [
                "... dass du Lust hast zu trainieren, regelmäßig und anhaltend.",
                "... dass du Fortschritte früh wahrnimmst (nicht wie z.B. beim Six-Pack, das sich erst nach ein paar Monaten abzeichnet).",
                "... dass du lernst, dass sichtbare Erfolge Zeit, Mühe und Hingabe erfordern. Deine Erfahrungen werden dich befähigen leere Versprechungen Anderer (Six-Pack über Nacht, Fettverbrenner-Tees, etc.) zu durchschauen.",
                "... dass du ein auf dich persönlich zugeschnittenes Trainingserlebnis hast.",
                "... dass du lernst mit abnehmender Unterstützung und zunehmenden Kenntnissen deinen Trainingsplan selbst zu erstellen.",
                "... dass du verstehen lernst dein eigenes Körpergewicht beim Training einzusetzen, sowie mit freien Gewichten zu arbeiten.",
                "... dass du die Möglichkeit bekommst dein Training flexibel in deinen Tagesablauf einzubauen; unabhängig davon, ob du in unser Studio kommst oder unsere App zu Hause, bei der Arbeit, im Park, oder im Urlaub nutzst.",
                "... dass du beständig an dir und deinen Fähigkeiten arbeitest, z.B. dass du vom einfachen Klimmzug zu einem einarmigen aufsteigst.",
                "... dass du mit Freunden, ähnlich Interessierten und Fachleuten gemeinsam trainieren und dich austauschen kannst.",
                "... dass du deine Freunde beim Trainieren nachhaltig unterstützst und diese wiederum dich."
            ];
            $scope.rotate = START_DEGREE;
            $scope.position = 0;
            $scope.step = ROTATE_STEP_BACKWARD;
            $scope.rotationStyle = {'transform': 'rotate(' + $scope.rotate + 'deg)'};
            $interval(function () {
                $scope.rotationStyle = {'transform-origin': '85% 50%'};
                if ($scope.rotate > START_DEGREE) {
                    $scope.rotate += $scope.step;
                }
                if ($scope.rotate >= MID_DEGREE) {
//                        $scope.rotationStyle = {'transform-origin': '100% 50%'};
                    $scope.step = ROTATE_STEP_FORWARD;
                }
                if ($scope.rotate >= STOP_DEGREE) {
                    $scope.rotate = START_DEGREE;
                    $scope.position++;
                    $scope.step = ROTATE_STEP_BACKWARD;
                }
                if ($scope.rotate < START_DEGREE) {
                    $scope.rotate = START_DEGREE;
                }
                var transformation = $interpolate('translate(0px, 0px) rotate({{rotate}}deg)');
                var imgWidth = $element.find(TIRE_SELECTOR).height();
                var transformValue = transformation({rotate: $scope.rotate, position: $scope.position * imgWidth});
                if ($scope.position % 2 == 0) {
//                        transformValue = 'scaleX(-1) '+transformValue;
                }
                jQuery.extend($scope.rotationStyle, {'transform': transformValue});
                if ($scope.position % 2 == 0) {
                    jQuery.extend($scope.rotationStyle, {'background-image': 'url("tire.png")'});
                } else {
                    jQuery.extend($scope.rotationStyle, {'background-image': 'url("tire_mirror.png")'});
                }
            }, 100);

            $scope.pullTire = function () {
                $scope.rotate += PULL_TIRE_STEP;
            }
        }]);