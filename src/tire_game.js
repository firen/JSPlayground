var TIRE_PARAMS_RIGHT = {
    ROTATE_STEP_FORWARD: 8,
    ROTATE_STEP_BACKWARD: -8,
    PULL_TIRE_STEP: 30,
    START_DEGREE: 0,
    MID_DEGREE: 90,
    STOP_DEGREE: 180,
    ROTATION_STYLE: {'transform-origin': '85% 50%'}
};

var TIRE_PARAMS_LEFT = {
    ROTATE_STEP_FORWARD: -8,
    ROTATE_STEP_BACKWARD: 8,
    PULL_TIRE_STEP: -30,
    START_DEGREE: 0,
    MID_DEGREE: -90,
    STOP_DEGREE: -180,
    ROTATION_STYLE: {'transform-origin': '15% 50%'}
};

angular.module("intervalExample", [])
    .controller("ExampleCtrl", ['$scope', '$interval', '$interpolate',
        function ($scope, $interval, $interpolate) {
            var tireBuilder = function (id, tireParams, startPosition, endPosition) {
                var rotateClockwise = tireParams.ROTATE_STEP_FORWARD > 0 ? 1 : -1;
                return {
                    rotate: tireParams.START_DEGREE,
                    step: tireParams.ROTATE_STEP_BACKWARD,
                    startPosition: startPosition,
                    endPosition: endPosition,
                    currentPosition: startPosition,
                    id: id,
                    finished: false,

                    doRotate: function () {
                        if(this.finished) {
                            return;
                        }
                        if (this.rotate * rotateClockwise > tireParams.START_DEGREE * rotateClockwise) {
                            this.rotate += this.step;
                        }
                        if (this.rotate * rotateClockwise >= tireParams.MID_DEGREE * rotateClockwise) {
                            this.step = tireParams.ROTATE_STEP_FORWARD;
                        }
                        if (this.rotate * rotateClockwise >= tireParams.STOP_DEGREE * rotateClockwise) {
                            this.rotate = tireParams.START_DEGREE;
                            this.currentPosition++;
                            this.step = tireParams.ROTATE_STEP_BACKWARD;
                        }
                        if (this.rotate * rotateClockwise < tireParams.START_DEGREE * rotateClockwise) {
                            this.rotate = tireParams.START_DEGREE;
                        }
                    },

                    doRender: function(scope) {
                        scope.rotationStyle[id] = {};
                        jQuery.extend(scope.rotationStyle[id], tireParams.ROTATION_STYLE);
                        if( this.currentPosition < this.endPosition ) {
                            scope.position = this.currentPosition;
                            var transformation = $interpolate('rotate({{rotate}}deg)');
                            var transformValue = transformation({rotate: this.rotate});
                            jQuery.extend(scope.rotationStyle[id], {'transform': transformValue});
                        } else {
                            scope.position++;
                            this.finished = true;
                        }
                        if (this.currentPosition % 2 == 0) {
                            jQuery.extend(scope.rotationStyle[id], {'background-image': 'url("tire.png")'});
                        } else {
                            jQuery.extend(scope.rotationStyle[id], {'background-image': 'url("tire_mirror.png")'});
                        }
                    },

                    pullTire: function () {
                        this.rotate += tireParams.PULL_TIRE_STEP;
                    }
                }
            };
            $scope.rotationStyle = {};
            $scope.position = 0;

            $scope.tires = [
                tireBuilder("tire1", TIRE_PARAMS_RIGHT, 0, 3),
                tireBuilder("tire2", TIRE_PARAMS_LEFT, 4, 7),
                tireBuilder("tire3", TIRE_PARAMS_RIGHT, 8, 11)
            ];

            $scope.selectTire = function(index) {
                for(var i = 0; i < $scope.tires.length; i++) {
                    if(  $scope.tires[i].startPosition <= index && $scope.tires[i].endPosition >= index ) {
                        return $scope.tires[i];
                    }
                }
            };

            $scope.positionEqualsAnyTireCurrentPosition = function(position) {
                for(var i = 0; i < $scope.tires.length; i++ ) {
                    if( $scope.tires[i].currentPosition == position ) {
                        return true;
                    }
                }
            };

            $scope.selectStyle = function(index) {
                return $scope.rotationStyle[$scope.selectTire(index).id];
            };

            $scope.stages = [
                {position: 0, description: "... dass du Lust hast zu trainieren, regelmäßig und anhaltend."},
                {position: 1, description: "... dass du Fortschritte früh wahrnimmst (nicht wie z.B. beim Six-Pack, das sich erst nach ein paar Monaten abzeichnet)."},
                {position: 2, description: "... dass du lernst, dass sichtbare Erfolge Zeit, Mühe und Hingabe erfordern. Deine Erfahrungen werden dich befähigen leere Versprechungen Anderer (Six-Pack über Nacht, Fettverbrenner-Tees, etc.) zu durchschauen."},
                {position: 3, description: "FINISH"},
                {position: 7, description: "FINISH"},
                {position: 6, description: "... dass du lernst mit abnehmender Unterstützung und zunehmenden Kenntnissen deinen Trainingsplan selbst zu erstellen."},
                {position: 5, description: "... dass du verstehen lernst dein eigenes Körpergewicht beim Training einzusetzen, sowie mit freien Gewichten zu arbeiten."},
                {position: 4, description: "... dass du ein auf dich persönlich zugeschnittenes Trainingserlebnis hast."},
                {position: 8, description: "... dass du die Möglichkeit bekommst dein Training flexibel in deinen Tagesablauf einzubauen; unabhängig davon, ob du in unser Studio kommst oder unsere App zu Hause, bei der Arbeit, im Park, oder im Urlaub nutzst."},
                {position: 9, description: "... dass du beständig an dir und deinen Fähigkeiten arbeitest, z.B. dass du vom einfachen Klimmzug zu einem einarmigen aufsteigst."},
                {position: 10, description: "... dass du mit Freunden, ähnlich Interessierten und Fachleuten gemeinsam trainieren und dich austauschen kannst."},
                {position: 11, description: "FINISH"}
//                {position: 12, description: "... dass du deine Freunde beim Trainieren nachhaltig unterstützst und diese wiederum dich."}
            ];

            var promise = $interval(function() {
                if($scope.position >= $scope.stages.length) {
                    $interval.cancel(promise);
                    return;
                }
                $scope.selectTire($scope.position).doRotate();
                $scope.selectTire($scope.position).doRender($scope);
            }, 100);

            $scope.pullTire = function (index) {
                $scope.selectTire(index).pullTire();
            };

        }]);