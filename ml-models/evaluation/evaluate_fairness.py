"""
Fairness evaluation script for content filtration models
"""

import numpy as np
from fairlearn.metrics import demographic_parity_difference, equalized_odds_difference
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import pandas as pd

class FairnessEvaluator:
    """Evaluate model fairness across demographic groups"""
    
    def __init__(self, predictions, ground_truth, sensitive_features):
        self.predictions = predictions
        self.ground_truth = ground_truth
        self.sensitive_features = sensitive_features
        
    def calculate_demographic_parity(self):
        """
        Demographic Parity: P(Ŷ=1|A=a) = P(Ŷ=1|A=b)
        Measures if positive predictions are equally distributed across groups
        """
        dp_diff = demographic_parity_difference(
            self.ground_truth,
            self.predictions,
            sensitive_features=self.sensitive_features
        )
        return abs(dp_diff)
    
    def calculate_equal_opportunity(self):
        """
        Equal Opportunity: P(Ŷ=1|Y=1,A=a) = P(Ŷ=1|Y=1,A=b)
        Measures if true positive rates are equal across groups
        """
        eo_diff = equalized_odds_difference(
            self.ground_truth,
            self.predictions,
            sensitive_features=self.sensitive_features
        )
        return abs(eo_diff)
    
    def calculate_group_metrics(self):
        """Calculate performance metrics for each demographic group"""
        unique_groups = np.unique(self.sensitive_features)
        metrics = {}
        
        for group in unique_groups:
            mask = self.sensitive_features == group
            group_pred = self.predictions[mask]
            group_truth = self.ground_truth[mask]
            
            metrics[str(group)] = {
                'accuracy': accuracy_score(group_truth, group_pred),
                'precision': precision_score(group_truth, group_pred, average='weighted'),
                'recall': recall_score(group_truth, group_pred, average='weighted'),
                'f1': f1_score(group_truth, group_pred, average='weighted'),
                'size': len(group_pred)
            }
        
        return metrics
    
    def generate_fairness_report(self):
        """Generate comprehensive fairness report"""
        report = {
            'demographic_parity': self.calculate_demographic_parity(),
            'equal_opportunity': self.calculate_equal_opportunity(),
            'group_metrics': self.calculate_group_metrics()
        }
        
        # Determine if model passes fairness thresholds
        report['passes_fairness'] = (
            report['demographic_parity'] < 0.1 and
            report['equal_opportunity'] < 0.1
        )
        
        return report
    
    def print_report(self, report):
        """Print formatted fairness report"""
        print("\n" + "="*50)
        print("FAIRNESS EVALUATION REPORT")
        print("="*50)
        print(f"\nDemographic Parity Difference: {report['demographic_parity']:.4f}")
        print(f"Equal Opportunity Difference: {report['equal_opportunity']:.4f}")
        print(f"\nPasses Fairness Thresholds: {report['passes_fairness']}")
        
        print("\nPer-Group Performance Metrics:")
        print("-"*50)
        for group, metrics in report['group_metrics'].items():
            print(f"\nGroup: {group} (n={metrics['size']})")
            print(f"  Accuracy:  {metrics['accuracy']:.4f}")
            print(f"  Precision: {metrics['precision']:.4f}")
            print(f"  Recall:    {metrics['recall']:.4f}")
            print(f"  F1 Score:  {metrics['f1']:.4f}")

if __name__ == "__main__":
    # Example usage
    # TODO: Load actual model predictions and ground truth
    
    # Dummy data for demonstration
    predictions = np.random.randint(0, 2, 1000)
    ground_truth = np.random.randint(0, 2, 1000)
    sensitive_features = np.random.choice(['group_a', 'group_b', 'group_c'], 1000)
    
    evaluator = FairnessEvaluator(predictions, ground_truth, sensitive_features)
    report = evaluator.generate_fairness_report()
    evaluator.print_report(report)
