var TIRE_PARAMS = {
    ROTATE_STEP_FORWARD: 8,
    ROTATE_STEP_BACKWARD: -8,
    PULL_TIRE_STEP: 30,
    START_DEGREE: 0,
    MID_DEGREE: 90,
    STOP_DEGREE: 180
};

angular.module("intervalExample", [])
    .controller("ExampleCtrl", ['$scope', '$interval', '$interpolate',
        function ($scope, $interval, $interpolate) {
            var tireBuilder = function (tireParams) {
                return {
                    rotate: tireParams.START_DEGREE,
                    step: tireParams.ROTATE_STEP_BACKWARD,
                    position: 0,

                    doRotate: function () {
                        if (this.rotate > tireParams.START_DEGREE) {
                            this.rotate += this.step;
                        }
                        if (this.rotate >= tireParams.MID_DEGREE) {
                            this.step = tireParams.ROTATE_STEP_FORWARD;
                        }
                        if (this.rotate >= tireParams.STOP_DEGREE) {
                            this.rotate = tireParams.START_DEGREE;
                            this.position++;
                            this.step = tireParams.ROTATE_STEP_BACKWARD;
                        }
                        if (this.rotate < tireParams.START_DEGREE) {
                            this.rotate = tireParams.START_DEGREE;
                        }
                    },

                    doRender: function(scope) {
                        scope.rotationStyle = {'transform-origin': '85% 50%'};
                        scope.position = this.position;
                        var transformation = $interpolate('rotate({{rotate}}deg)');
                        var transformValue = transformation({rotate: this.rotate});
                        jQuery.extend(scope.rotationStyle, {'transform': transformValue});
                        if (this.position % 2 == 0) {
                            jQuery.extend(scope.rotationStyle, {'background-image': 'url("tire.png")'});
                        } else {
                            jQuery.extend(scope.rotationStyle, {'background-image': 'url("tire_mirror.png")'});
                        }
                    },

                    pullTire: function () {
                        this.rotate += tireParams.PULL_TIRE_STEP;
                    }
                }
            };
            $scope.tire = tireBuilder(TIRE_PARAMS, $scope);
            $scope.stages = [
                {position: 0, description: "... dass du Lust hast zu trainieren, regelmäßig und anhaltend."},
                {position: 1, description: "... dass du Fortschritte früh wahrnimmst (nicht wie z.B. beim Six-Pack, das sich erst nach ein paar Monaten abzeichnet)."},
                {position: 2, description: "... dass du lernst, dass sichtbare Erfolge Zeit, Mühe und Hingabe erfordern. Deine Erfahrungen werden dich befähigen leere Versprechungen Anderer (Six-Pack über Nacht, Fettverbrenner-Tees, etc.) zu durchschauen."},
                {position: 5, description: "... dass du ein auf dich persönlich zugeschnittenes Trainingserlebnis hast."},
                {position: 4, description: "... dass du lernst mit abnehmender Unterstützung und zunehmenden Kenntnissen deinen Trainingsplan selbst zu erstellen."},
                {position: 3, description: "... dass du verstehen lernst dein eigenes Körpergewicht beim Training einzusetzen, sowie mit freien Gewichten zu arbeiten."},
                {position: 6, description: "... dass du die Möglichkeit bekommst dein Training flexibel in deinen Tagesablauf einzubauen; unabhängig davon, ob du in unser Studio kommst oder unsere App zu Hause, bei der Arbeit, im Park, oder im Urlaub nutzst."},
                {position: 7, description: "... dass du beständig an dir und deinen Fähigkeiten arbeitest, z.B. dass du vom einfachen Klimmzug zu einem einarmigen aufsteigst."},
                {position: 8, description: "... dass du mit Freunden, ähnlich Interessierten und Fachleuten gemeinsam trainieren und dich austauschen kannst."},
                {position: 9, description: "... dass du deine Freunde beim Trainieren nachhaltig unterstützst und diese wiederum dich."}
            ];

            $interval(function() {$scope.tire.doRotate();$scope.tire.doRender($scope)}, 100);

            $scope.pullTire = function () {
                $scope.tire.pullTire();
            };

        }]);