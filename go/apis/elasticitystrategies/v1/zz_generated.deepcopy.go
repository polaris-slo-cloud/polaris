// +build !ignore_autogenerated

/*
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Code generated by controller-gen. DO NOT EDIT.

package v1

import (
	runtime "k8s.io/apimachinery/pkg/runtime"
)

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *ElasticityStrategyTarget) DeepCopyInto(out *ElasticityStrategyTarget) {
	*out = *in
	out.TargetRef = in.TargetRef
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new ElasticityStrategyTarget.
func (in *ElasticityStrategyTarget) DeepCopy() *ElasticityStrategyTarget {
	if in == nil {
		return nil
	}
	out := new(ElasticityStrategyTarget)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *HorizontalElasticityStrategy) DeepCopyInto(out *HorizontalElasticityStrategy) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ObjectMeta.DeepCopyInto(&out.ObjectMeta)
	in.Spec.DeepCopyInto(&out.Spec)
	out.Status = in.Status
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new HorizontalElasticityStrategy.
func (in *HorizontalElasticityStrategy) DeepCopy() *HorizontalElasticityStrategy {
	if in == nil {
		return nil
	}
	out := new(HorizontalElasticityStrategy)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *HorizontalElasticityStrategy) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *HorizontalElasticityStrategyList) DeepCopyInto(out *HorizontalElasticityStrategyList) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ListMeta.DeepCopyInto(&out.ListMeta)
	if in.Items != nil {
		in, out := &in.Items, &out.Items
		*out = make([]HorizontalElasticityStrategy, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new HorizontalElasticityStrategyList.
func (in *HorizontalElasticityStrategyList) DeepCopy() *HorizontalElasticityStrategyList {
	if in == nil {
		return nil
	}
	out := new(HorizontalElasticityStrategyList)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *HorizontalElasticityStrategyList) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *HorizontalElasticityStrategySpec) DeepCopyInto(out *HorizontalElasticityStrategySpec) {
	*out = *in
	out.ElasticityStrategyTarget = in.ElasticityStrategyTarget
	in.SloCompliance.DeepCopyInto(&out.SloCompliance)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new HorizontalElasticityStrategySpec.
func (in *HorizontalElasticityStrategySpec) DeepCopy() *HorizontalElasticityStrategySpec {
	if in == nil {
		return nil
	}
	out := new(HorizontalElasticityStrategySpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *HorizontalElasticityStrategyStatus) DeepCopyInto(out *HorizontalElasticityStrategyStatus) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new HorizontalElasticityStrategyStatus.
func (in *HorizontalElasticityStrategyStatus) DeepCopy() *HorizontalElasticityStrategyStatus {
	if in == nil {
		return nil
	}
	out := new(HorizontalElasticityStrategyStatus)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *HorizontalScalingSpec) DeepCopyInto(out *HorizontalScalingSpec) {
	*out = *in
	if in.MaxReplicas != nil {
		in, out := &in.MaxReplicas, &out.MaxReplicas
		*out = new(int32)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new HorizontalScalingSpec.
func (in *HorizontalScalingSpec) DeepCopy() *HorizontalScalingSpec {
	if in == nil {
		return nil
	}
	out := new(HorizontalScalingSpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *SloCompliance) DeepCopyInto(out *SloCompliance) {
	*out = *in
	if in.CurrSloCompliance != nil {
		in, out := &in.CurrSloCompliance, &out.CurrSloCompliance
		x := (*in).DeepCopy()
		*out = &x
	}
	if in.SloTargetCompliance != nil {
		in, out := &in.SloTargetCompliance, &out.SloTargetCompliance
		x := (*in).DeepCopy()
		*out = &x
	}
	if in.Tolerance != nil {
		in, out := &in.Tolerance, &out.Tolerance
		x := (*in).DeepCopy()
		*out = &x
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new SloCompliance.
func (in *SloCompliance) DeepCopy() *SloCompliance {
	if in == nil {
		return nil
	}
	out := new(SloCompliance)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *TemplateStrategy) DeepCopyInto(out *TemplateStrategy) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ObjectMeta.DeepCopyInto(&out.ObjectMeta)
	in.Spec.DeepCopyInto(&out.Spec)
	out.Status = in.Status
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new TemplateStrategy.
func (in *TemplateStrategy) DeepCopy() *TemplateStrategy {
	if in == nil {
		return nil
	}
	out := new(TemplateStrategy)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *TemplateStrategy) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *TemplateStrategyList) DeepCopyInto(out *TemplateStrategyList) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ListMeta.DeepCopyInto(&out.ListMeta)
	if in.Items != nil {
		in, out := &in.Items, &out.Items
		*out = make([]TemplateStrategy, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new TemplateStrategyList.
func (in *TemplateStrategyList) DeepCopy() *TemplateStrategyList {
	if in == nil {
		return nil
	}
	out := new(TemplateStrategyList)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *TemplateStrategyList) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *TemplateStrategySpec) DeepCopyInto(out *TemplateStrategySpec) {
	*out = *in
	out.TargetRef = in.TargetRef
	if in.HorizontalSpec != nil {
		in, out := &in.HorizontalSpec, &out.HorizontalSpec
		*out = new(HorizontalScalingSpec)
		(*in).DeepCopyInto(*out)
	}
	if in.VerticalSpec != nil {
		in, out := &in.VerticalSpec, &out.VerticalSpec
		*out = new(VerticalScalingSpec)
		(*in).DeepCopyInto(*out)
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new TemplateStrategySpec.
func (in *TemplateStrategySpec) DeepCopy() *TemplateStrategySpec {
	if in == nil {
		return nil
	}
	out := new(TemplateStrategySpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *TemplateStrategyStatus) DeepCopyInto(out *TemplateStrategyStatus) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new TemplateStrategyStatus.
func (in *TemplateStrategyStatus) DeepCopy() *TemplateStrategyStatus {
	if in == nil {
		return nil
	}
	out := new(TemplateStrategyStatus)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *VerticalScalingSpec) DeepCopyInto(out *VerticalScalingSpec) {
	*out = *in
	if in.MinMemory != nil {
		in, out := &in.MinMemory, &out.MinMemory
		x := (*in).DeepCopy()
		*out = &x
	}
	out.MaxMemory = in.MaxMemory.DeepCopy()
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new VerticalScalingSpec.
func (in *VerticalScalingSpec) DeepCopy() *VerticalScalingSpec {
	if in == nil {
		return nil
	}
	out := new(VerticalScalingSpec)
	in.DeepCopyInto(out)
	return out
}
